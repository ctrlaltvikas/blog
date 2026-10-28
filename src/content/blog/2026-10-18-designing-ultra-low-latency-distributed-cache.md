---
title: "Designing an Ultra-Low Latency Distributed Cache: Stampede Protection & Coherence"
description: "A comprehensive teardown of singleflight locks, two-tier cache hierarchies, lease-based consistency, and mitigating tail latencies under millions of QPS."
pubDate: 2026-10-18
author: "Vikas Kumar Yadav"
category: "Distributed Systems"
tags: ["distributed-systems", "performance", "caching", "architecture"]
featured: false
draft: false
---

## The Illusion of Simple Caching

Every distributed systems engineer remembers their first catastrophic cache stampede in production. What seems like an elementary key-value mapping (`cache.get(key) ?? db.fetch(key)`) rapidly degrades under massive concurrency.

When a popular key expires under 50,000 requests per second, all 50,000 threads simultaneously miss the cache and hammer the downstream database. Latency spikes from 2ms to 45 seconds, database connection pools exhaust, and a cascading failure ensues.

> "A cache without stampede protection is not a performance optimization—it is an outage waiting for peak traffic."

## The Multi-Layer Defense Pattern

To maintain p99 latencies under 5ms at hyperscale, a production caching system must employ a defense-in-depth architecture.

### 1. In-Process Singleflight (Request Coalescing)
If 1,000 concurrent goroutines or workers request the same missing key simultaneously, only one worker is permitted to fetch from the source of truth. The other 999 wait on a shared future/promise.

```typescript
export class SingleFlight<T> {
  private inFlight = new Map<string, Promise<T>>();

  async do(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = this.inFlight.get(key);
    if (existing) {
      return existing; // Share the pending promise
    }

    const promise = fn().finally(() => {
      this.inFlight.delete(key);
    });

    this.inFlight.set(key, promise);
    return promise;
  }
}
```

### 2. Probabilistic Early Expiration (XFetch Algorithm)
Instead of waiting for a TTL to strictly reach 0, calculate early refresh probability based on compute cost and delta time:

$$\text{ShouldRefresh} = (-\beta \times \delta \times \ln(\text{random}())) > \text{TTL}_{\text{remaining}}$$

Where:
- $\beta > 0$ controls aggressive re-computation
- $\delta$ is the observed computation duration in milliseconds
- $\text{random}() \in (0, 1)$

This guarantees that high-traffic keys are asynchronously recalculated by background threads *before* they ever expire in the critical read path.

### 3. Two-Tier Hierarchy (L1 In-Memory + L2 Distributed)
- **L1 (Local Memory)**: Tiny LRU cache directly within the Node.js / Go / Rust process. Near-zero serialization cost (p99 < 0.1ms).
- **L2 (Redis / Dragonfly Cluster)**: Network-distributed shared cache with consistent hashing.
- **Cache Invalidation Broadcast**: Utilizes Redis Pub/Sub or Kafka invalidation events with monotonic sequence numbers to purge stale L1 entries across server instances.

## Production Checklist

Before taking any distributed cache to production, ensure you have:

- [x] Configured memory limits with `volatile-lru` or `allkeys-lru` eviction policies.
- [x] Implemented jittered TTLs (e.g. `baseTTL + Math.random() * 60s`) to avoid synchronized mass expirations.
- [x] Instrumented Grafana dashboards tracking Cache Hit Ratio, p99 fetch latency, and SingleFlight coalescing efficiency.

Building rock-solid distributed systems is about embracing failure as a constant and designing resilient contracts.
