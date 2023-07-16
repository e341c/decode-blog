function toggle(index){
    let element = document.querySelectorAll('#menu')
    element[index].classList.toggle('d-none')
}
function deleteBlog(id, authorID){
    console.log(id, authorID);
    axios.delete(`/api/blogs/${id}`).then(data => {
        console.log(data);
        if(data.status == 200){
            location.replace(`/profile/${authorID}`)
        }else if(data.status == 404){
            location.replace('/not-found')
        }
    })
    console.log(id, authorID);
}
