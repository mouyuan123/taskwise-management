async function base64ImgToBufferStore(base64Img) {
    return Buffer.from(base64Img, 'base64');
}

modules.export = base64ImgToBufferStore;