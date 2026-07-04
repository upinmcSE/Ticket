package io.github.upinmcse.infrastructure.distributed.redission;

public interface RedisDistributedService {
    RedisDistributedLocker getDistributedLock(String lockKey);
}
