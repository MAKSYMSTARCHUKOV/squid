function defineDevice(){
  document.documentElement.style.setProperty('--vh', window.innerHeight / 100 + 'px');
  _device = 
    window.matchMedia('(max-width: 900px)').matches 
      ? 'mobile' 
      : 'desktop';
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}