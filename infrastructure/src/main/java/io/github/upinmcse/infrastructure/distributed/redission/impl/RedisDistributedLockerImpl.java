package io.github.upinmcse.infrastructure.distributed.redission.impl;

import io.github.upinmcse.infrastructure.distributed.redission.RedisDistributedLocker;
import io.github.upinmcse.infrastructure.distributed.redission.RedisDistributedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisDistributedLockerImpl implements RedisDistributedService {

    private final RedissonClient redissonClient;


    @Override
    public RedisDistributedLocker getDistributedLock(String lockKey) {
        return null;
    }
}
