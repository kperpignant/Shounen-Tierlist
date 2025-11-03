// ---------------CHATGPT-----------------------


// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash");

// Array.from(thumbUp).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messages', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp': thumbUp
//       })
//     })
//     .then(response => response.ok && response.json())
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messagesDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp': thumbUp
//       })
//     })
//     .then(response => response.ok && response.json())
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// Array.from(trash).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });


// ---------------CHATGPT-----------------------
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item');
  const tiers = document.querySelectorAll('.tier-content');

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.name);
      item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });
// ---------------CHATGPT-----------------------
  tiers.forEach(tier => {
    tier.addEventListener('dragover', e => e.preventDefault());

    tier.addEventListener('drop', async e => {
      e.preventDefault();
      const name = e.dataTransfer.getData('text/plain');
      const newTier = tier.dataset.tier;
      const dragged = document.querySelector(`[data-name="${name}"]`);
      tier.appendChild(dragged);

      await fetch('/update-tier', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, newTier })
      });

      console.log(`${name} moved to ${newTier} tier`);
    });
  });
});
