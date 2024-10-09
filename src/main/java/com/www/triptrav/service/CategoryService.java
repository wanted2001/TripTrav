package com.www.triptrav.service;

import java.util.List;
import java.util.Map;

public interface CategoryService {
    Map<String, String> getCategoryCodes(List<String> categoryNames);
}
