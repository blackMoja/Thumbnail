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
    const ratio = await this.calcRatio(getOhOw);
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

  calcRatio(origin) {
    const { oh, ow } = origin;
    // max-width / max-height wrapper div 가 600 * 600 이면 이걸 계산해야댐.
    // rw : 
    // rh
  }
}

const singleton = new ThumbNail();

export default singleton;