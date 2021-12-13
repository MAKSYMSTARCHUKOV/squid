//= helper.js

const IMG_RATIO = () => {
  switch(_device){
    case 'mobile':
      return 236 / 169;
    case 'desktop':
      return 736 / 396;
  }
};
const IMG_PIXEL = ['#1A000A', '#273230', '#273230', '#120018']
const FRAME = {
  width: {
    desktop: 1100,
    mobile: 367
  },
  height: {
    desktop: 0,
    mobile: 0
  },
  slot: {
    width: {
      desktop: 0,
      mobile: 0
    },
    height: {
      desktop: 0,
      mobile: 0
    }
  }
}

function uploadSlotImages(){
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all(
        IMG_PIXEL.map((_, index) => {
          return new Promise((resolve, reject) => {
            const im = document.createElement('img');
            im.src = `img/slot${index}.jpg`;
            im.onload = resolve;
            im.onerror = resolve;
          })
        })
      )
      resolve();
    } catch (error) {
      resolve();
    }
  })
}

async function createFrame(){
  await uploadSlotImages();  
  const slot = document.querySelector('.g__slot');
  const maxFrameWidth = FRAME.width[_device];
  const rowWidth = maxFrameWidth / 3;
  const rowHeight = rowWidth / IMG_RATIO();
  const maxFrameHeight = rowHeight * 3;
  FRAME.height[_device] = maxFrameHeight;
  FRAME.slot.width[_device] = rowWidth;
  FRAME.slot.height[_device] = rowHeight;
  slot.style.width = maxFrameWidth + 'px';
  slot.style.height = maxFrameHeight + 'px';
}

function recalculateFrame(){
  let extremeWidth;
  let wW = window.innerWidth;
  switch(_device){
    case 'mobile':
      extremeWidth = FRAME.width.mobile + 50
      break;
    case 'desktop':
      extremeWidth = FRAME.width.desktop + 400
      break;
  }
  if(extremeWidth > wW){    
    const slot = document.querySelector('.g__slot');
    const diff = extremeWidth - wW;
    const maxFrameWidth = FRAME.width[_device] - diff;
    const rowWidth = maxFrameWidth / 3;
    const rowHeight = rowWidth / IMG_RATIO();
    const maxFrameHeight = rowHeight * 3;
    slot.style.width = maxFrameWidth + 'px';
    slot.style.height = maxFrameHeight + 'px';
  } 
}

document.addEventListener('DOMContentLoaded', () => {
  defineDevice();
  createFrame();
})

window.addEventListener('load', () => {
  recalculateFrame();
})

window.addEventListener('resize', () => {
  recalculateFrame();
})