#include <vector>
#include <emscripten/bind.h>
#include <emscripten/val.h>

struct rect {
    int32_t x;
    int32_t y;
    int32_t width;
    int32_t height;
};

struct v2 {
    int32_t x;
    int32_t y;
};

struct voxel {
    int32_t x;
    int32_t y;
    int32_t z;
};

struct rgba {
    uint8_t red   = 0;
    uint8_t green = 0;
    uint8_t blue  = 0;
    uint8_t alpha = 0;
}

struct node {
    node* children [4] = {nullptr, nullptr, nullptr, nullptr};
    rgba colors [4] = {};
};