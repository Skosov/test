let commentForm = document.querySelector('.comment-form');
let commentList = document.querySelector('.comment-list');
let commentField = document.querySelector('.comment-field');
let charCounter = document.querySelector('.char-counter');
let submitButton = document.querySelector('.submit-button');
let nameInput = document.querySelector('.input-name');
let numberInput = document.querySelector('.input-number');

var data;
var counter;
let del = document.querySelectorAll('.del');
let edit = document.querySelectorAll('.edit');


class Comment {
  constructor(id = 0, userName = 'user', userCommentText = '', userRating = 5) {

    this.id = id;
    this.userName = userName;
    this.userCommentText = userCommentText;
    this.userRating = userRating;
  }
  render() {
    const pattern = `
        <li class="user-comment" data-id="${this.id}">
          <h3 class ="username">${this.userName}</h3>
          <p class="commentText">${this.userCommentText}</p>
          <p class = "rating-number">${this.userRating}</p>
          <div class = "del"></div>
          <div class = "edit"></div>
        </li>
    `;

    document.querySelector('.comment-list').innerHTML += pattern
    del = document.querySelectorAll('.del')
    edit = document.querySelectorAll('.edit')
    console.log(edit)
    remove(del)
    editing()
}
}




const xhr = new XMLHttpRequest();
      xhr.open('GET', 'data.json');
      xhr.send();
      xhr.addEventListener('readystatechange', () => {
        if (xhr.status === 200 && xhr.readyState == 4) {
          parseToHtml(xhr.response);
        } else return;
      });

     
      const parseToHtml = (obj) => {
        data = JSON.parse(obj);
        counter = data.length;

        // create new comment
        data.forEach(comment => {
          const c = new Comment(comment.id, comment.userName, comment.userCommentText, comment.userRating);
          c.render();
        });
    }



commentForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  counter++;
  const newComm = new Comment(counter,nameInput.value, commentField.value, numberInput.value);
  newComm.render();
  // console.log(newComm);
  commentField.value = '';
  nameInput.value = '';
  charCounter.textContent = 0;
});

commentField.addEventListener('input', function () {
  charCounter.textContent = commentField.value.length;

  if (commentField.value.length > 200) {
    commentField.classList.add('warning');
    submitButton.disabled = true;
  } else {
    commentForm.classList.remove('warning');
    commentField.disabled = false;
  }
});





function remove(element)
{
  del = document.querySelectorAll('.del');
  del.forEach(element => {
    element.addEventListener('click', () => {
      const comment = element.parentElement;
      comment.parentElement.removeChild(comment);
});
});
}



function editing()
{
edit.forEach(element =>
        {
          element.addEventListener('click', () =>
          {
            const comment = element.parentElement;
            const temp = `<form>
            <textarea class="edit-comms"></textarea>
            <button class="edit-button" type="submit">Сохранить</button>
            </form>
            `;
            comment.innerHTML += temp;
            let text = comment.querySelector('.commentText');
            let input = comment.querySelector('.edit-comms');
            input.value = text.textContent;
            const button = comment.parentElement.querySelector('.edit-button');
            button.addEventListener('click', function (evt) {
                evt.preventDefault();
                text.textContent = input.value;
                const form = document.querySelector('.edit-comms');
                form.parentElement.removeChild(form);
                button.parentElement.removeChild(button);
                edit = document.querySelectorAll('.edit');
                editing();
                remove();
            });
          });
        });
}


remove(del);
editing();