(function(){
  function prefix(){return document.body && document.body.dataset && document.body.dataset.assetPrefix ? document.body.dataset.assetPrefix : '';}
  function loadExtras(){
    var p=prefix();
    if(!document.querySelector('link[href="'+p+'loader-menu.css"]')){
      var l=document.createElement('link');l.rel='stylesheet';l.href=p+'loader-menu.css?v=1';document.head.appendChild(l);
    }
    if(!document.querySelector('.page-loader')){
      document.body.classList.add('is-loading-page');
      var loader=document.createElement('div');
      loader.className='page-loader';
      loader.innerHTML='<div class="loader-card"><div class="loader-gift">🎁</div><p>Preparando detalles especiales</p><div class="loader-dots"><span></span><span></span><span></span></div></div>';
      document.body.prepend(loader);
      setTimeout(function(){loader.classList.add('hide');document.body.classList.remove('is-loading-page');setTimeout(function(){loader.remove();},700);},850);
    }
  }
  function build(){
    var nav=document.querySelector('.navbar');
    if(!nav)return null;
    var box=document.getElementById('customer-access');
    if(!box){
      box=document.createElement('div');
      box.id='customer-access';
      box.className='customer-access';
      box.innerHTML='<button id="customer-button" class="customer-button" type="button"><span>👤</span><strong id="customer-button-text">Área clientes</strong></button><div id="customer-panel" class="customer-panel"></div>';
      nav.appendChild(box);
    }
    return box;
  }
  async function status(){
    try{var r=await fetch(prefix()+'cliente/session_status.php',{cache:'no-store'});return r.ok?await r.json():{logged:false};}catch(e){return {logged:false};}
  }
  function guest(panel){var p=prefix();panel.innerHTML='<div class="customer-tabs"><button type="button" class="customer-tab active">Iniciar sesión</button><button type="button" class="customer-tab">Crear cuenta</button></div><div class="customer-form customer-access-links"><p class="customer-note">Accede con tu cuenta para activar beneficios, ofertas y atención personalizada.</p><a class="customer-main-link" href="'+p+'cliente/login.php">Iniciar sesión</a><a class="customer-secondary-link" href="'+p+'cliente/registro.php">Crear cuenta nueva</a><a class="customer-recover-link" href="'+p+'cliente/forgot_password.php">Olvidé mi contraseña</a></div>';}
  function logged(panel,c){var p=prefix();var n=String(c.nombre||'Cliente').split(' ')[0];panel.innerHTML='<div class="customer-welcome"><span class="customer-badge">'+(c.nivel||'Cliente')+'</span><h3>Hola, '+n+'</h3><p>Tu sesión está activa. Ya puedes disfrutar beneficios y ofertas exclusivas.</p></div><div class="benefits-list"><div><strong>Beneficios activos</strong><span>Promociones para clientes registrados.</span></div><div><strong>Atención preferencial</strong><span>Coordinación rápida para reservas y pedidos.</span></div><div><strong>Ofertas en tiempo real</strong><span>Avisos por correo o WhatsApp según tus preferencias.</span></div></div><div class="customer-actions"><a class="customer-mini-btn" href="'+p+'cliente/dashboard.php">Mi cuenta</a><a class="customer-mini-btn" href="'+p+'tienda.html">Ver tienda</a><a class="customer-mini-btn" href="'+p+'cliente/logout.php">Cerrar sesión</a></div>';}
  async function render(){var box=build();if(!box)return;var panel=document.getElementById('customer-panel');var txt=document.getElementById('customer-button-text');if(!panel)return;var s=await status();if(s.logged&&s.cliente){if(txt)txt.textContent=String(s.cliente.nombre||'Cliente').split(' ')[0];logged(panel,s.cliente);}else{if(txt)txt.textContent='Área clientes';guest(panel);}}
  function init(){loadExtras();var box=build();var btn=document.getElementById('customer-button');if(!box||!btn)return;btn.onclick=function(e){e.stopPropagation();box.classList.toggle('open');render();};document.addEventListener('click',function(e){if(!box.contains(e.target))box.classList.remove('open');});render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
