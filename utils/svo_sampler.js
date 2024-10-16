
async function get_vertices () {
    let pixels;

    await createModule().then(Module => {pixels = Module.get_vertices(); }).catch(err => { console.error('error initializing wasm module:', err);
    });

    return pixels;
}

async function get_lines () {
    let pixels;

    await createModule().then(Module => {pixels = Module.get_lines(); }).catch(err => { console.error('error initializing wasm module:', err);
    });

    return pixels;
}

export { get_vertices, get_lines };