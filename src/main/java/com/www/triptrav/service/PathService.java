package com.www.triptrav.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.www.triptrav.domain.PathVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PathService {

    private final ResourceLoader resourceLoader;
    private List<PathVO> pathList;
    private List<PathVO> serveList;

    public PathService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
        imagePath();
    }

    private void imagePath() {
        if (pathList == null) {
            pathList = new ArrayList<>();
            try {
                Resource resource = resourceLoader.getResource("classpath:static/dist/json/planData.json");
                ObjectMapper objectMapper = new ObjectMapper();

                JsonNode rootNode = objectMapper.readTree(resource.getInputStream());

                for (JsonNode item : rootNode) {
                    PathVO data = new PathVO(
                            item.path("contentid").asLong(),
                            item.path("firstimage").asText(),
                            item.path("contenttypeid").asLong()
                    );
                    pathList.add(data);
                }
            } catch (IOException e) {
                log.error("데이터 로딩 에러", e);
            }
        }
    }


    public List<PathVO> loadPathList() {
        return pathList;
    }
}
