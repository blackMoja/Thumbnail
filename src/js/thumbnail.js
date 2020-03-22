class ThumbNail {
  constructor() { }

  make(img, ro) {
    return this.isImg(img) ? this.makeTn(img, ro) : alert('이미지 파일만 등록해라 좀.');
  }

  isImg(v) {
    return v instanceof File && v.type.indexOf('image') === 0;
  }

  async makeTn(img, ro) {
    const getOhOw = await this.getOhOw(img);
    const size = await this.calcWH(getOhOw, ro);
    const url = await this.getDataUrl(img);

    return this.thumbNail(url, size);
  }

  getOhOw(img) {
    return new Promise(resolve => {
      let mImg = new Image();
      let objUrl = window.URL.createObjectURL(img);

      mImg.onload = function () {
        resolve({ ow: this.width, oh: this.height })
        window.URL.revokeObjectURL(objUrl)
      };

      mImg.src = objUrl;
    });
  }

  calcWH(origin, ro) {
    // max-width / max-height wrapper div 가 600 * 600 이면 이걸 계산해야댐.
    return new Promise(resolve => {
      const { oh, ow } = origin;
      const { rh, rw } = ro;
      const ratioW = Math.round(ow / rw);
      const ratioH = Math.round(oh / rh);

      resolve({ rh: Math.round(oh / ratioH), rw: Math.round(ow / ratioW) });
    });
  }

  getDataUrl(img) {
    return new Promise(resolve => {
      const fr = new FileReader();

      fr.onload = e => {
        return resolve(e.target.result);
      };
      fr.readAsDataURL(img);
    });
  }

  thumbNail(url, size) {
    let img = new Image(size.rw, size.rh);
    img.crossOrigin = 'anonymous';
    img.src = url;

    console.log(img);
    return img;
  }
}

const singleton = new ThumbNail();

export default singleton;