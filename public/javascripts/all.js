// 刪除待辦事項

function deleteTodo(id) {
  Swal.fire({
    title: 'Do you want to delete the todo?',
    showCancelButton: true,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      axios({
        method: 'post',
        url: '/deleteTodo',
        data: {
          todo_id: id,
        }
      }).then(res=>{
        window.location.reload();
      }).catch(err=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Plz Try Again!',
        })
      })
    }
  })
}

// 變更待辦事項狀態

function changeStatus(that, id) {
  axios({
    method: 'post',
    url: '/changeStatus',
    data: {
      todo_id: id,
      status: that.checked ? '1' : '0'
    }
  }).then(res=>{
    window.location.reload();
  }).catch(err=>{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Plz Try Again!',
    })
  })
}