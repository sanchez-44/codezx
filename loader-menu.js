(function(){
  function injectLoader(){
    if(document.querySelector('.page-loader')) return;
    document.body.classList.add('is-loading-page');
    var loader=document.createElement('div');
    loader.className='page-loader';
    loader.innerHTML='<div class="loader-card"><div class="loader-gift">🎁</div><p>Preparando detalles especiales</p><div class="loader-dots"><span></span><span></span><span></span></div></div>';
    document.body.prepend(loader);
    setTimeout(function(){
      loader.classList.add('hide');
      document.body.classList.remove('is-loading-page');
      setTimeout(function(){loader.remove();},700);
    },850);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectLoader);else injectLoader();
})();
