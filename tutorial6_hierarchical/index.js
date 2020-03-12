const modal = document.querySelector('.modal');
M.Modal.init(modal);

const form = document.querySelector('form');
const name = document.querySelector('#name');
const Lname = document.querySelector('#Lname');
const parent = document.querySelector('#parent');
const department = document.querySelector('#department');

form.addEventListener('submit', e => {
  e.preventDefault();

  db.collection('Project_Hierarchy').add({
    name: name.value, 
    Lname: Lname.value, 
    parent: parent.value, 
    department: department.value
  });

  var instance = M.Modal.getInstance(modal);
  instance.close();

  form.reset();
});
