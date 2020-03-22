import thumbnail from './thumbnail';

document.getElementById('file').addEventListener('change', e => {
  const img = e.target.files[0];
  thumbnail.make(e.target.files[0], { rh: 600, rw: 600 }).then(resp => {
    document.body.appendChild(resp)
  });
});