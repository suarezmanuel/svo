#include "svo.h"

std::vector<v2> rectToPoints(std::vector<rect> rects) {
    std::vector<v2> res;
    // top left points
    for (auto &rect : rects) {
        v2 tl {rect.x, rect.y};
        v2 tr {rect.x+rect.width, rect.y};
        v2 bl {rect.x, rect.y-rect.height};
        v2 br {rect.x+rect.width, rect.y-rect.height};
        // top triangle
        res.push_back(tl);
        res.push_back(tr);
        res.push_back(bl);
        // bottom triangle
        res.push_back(tr);
        res.push_back(br);
        res.push_back(bl);
    }
    return res;    
}

std::vector<v2> rectFrameToPoints(std::vector<rect> rectFrames) {
    std::vector<v2> res;
    // top left points
    for (auto &rect : rectFrames) {
        v2 tl {rect.x, rect.y};
        v2 tr {rect.x+rect.width, rect.y};
        v2 bl {rect.x, rect.y-rect.height};
        v2 br {rect.x+rect.width, rect.y-rect.height};
        // top line
        res.push_back(tl);
        res.push_back(tr);
        // right line
        res.push_back(tr);
        res.push_back(br);
        // bottom line
        res.push_back(br);
        res.push_back(bl);
        // left line
        res.push_back(bl);
        res.push_back(tl);
    }
    return res;  
}

emscripten::val get_vertices() {
    std::vector<rect> rects = { {100, 100, 50, 50} };
    
    std::vector<v2> points = rectToPoints(rects);
    size_t numInts = points.size() * 2;

    int32_t* ptr = reinterpret_cast<int32_t*>(points.data());

    return emscripten::val(emscripten::typed_memory_view(numInts, ptr));
}

emscripten::val get_lines() {
    std::vector<rect> rectFrames = { {50, 50, 50, 50} };

    std::vector<v2> points = rectFrameToPoints(rectFrames);
    size_t numInts = points.size() * 2;

    int32_t* ptr = reinterpret_cast<int32_t*>(points.data());

    return emscripten::val(emscripten::typed_memory_view(numInts, ptr));
}


void addToSVO(voxel &voxel, node*& svo) {

}

void createSVO(voxel voxels[]) {

    node* svo;

    for (auto &voxel : voxels) {
        addToSVO(voxel, svo);
    }
}

std::vector<v2> parseSVO() {

}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::value_object<v2>("v2")
        .field("x", &v2::x)
        .field("y", &v2::y);
    emscripten::register_vector<v2>("vector<v2>");
    emscripten::function("get_vertices", &get_vertices);
    emscripten::function("get_lines", &get_lines);
}