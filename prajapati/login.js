async function login() {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5001/admin/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if(data.success){

        localStorage.setItem("token",data.token);

        alert("Login Successful");

        window.location.href="admin.html";

    }else{

        alert(data.message);

    }

}