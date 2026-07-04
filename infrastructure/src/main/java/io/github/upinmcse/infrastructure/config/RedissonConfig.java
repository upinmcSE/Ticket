package io.github.upinmcse.infrastructure.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedissonConfig {
    private static final int CONNECT_POOL = 50;

    @Bean
    public RedissonClient redissonClient(){
        Config config = new Config();
        config.useSingleServer().setAddress("redis://127.0.0.1:6319")
                .setConnectionPoolSize(CONNECT_POOL);

        return Redisson.create(config);
    }

    // to sentinel
//    @Bean
//    public RedissonClient redissonClient() {
//        Config config = new Config();
//        config.useSentinelServers()
//                .setMasterName("mymaster") // Tên master như được đặt trong Sentinel
//                .addSentinelAddress(
//                        "redis://localhost:26379",
//                        "redis://localhost:26380",
//                        "redis://localhost:26381"
//                ) // Danh sách Sentinel
//                .setPassword("123456") //
//                .setCheckSentinelsList(false)
//                .setDatabase(0) // Chọn database (mặc định là 0)
//                .setMasterConnectionPoolSize(50)
//                .setMasterConnectionMinimumIdleSize(10)
//                .setSlaveConnectionPoolSize(50)
//                .setSlaveConnectionMinimumIdleSize(10);
//
//
//        return Redisson.create(config);
//    }
}
