window.onload = function() {
    const send = document.getElementById("send");

    send.addEventListener("click", function() {
    	closeAll();
        personData = checkInputs();
        if(!personData) return;
        addData(personData);
    });

    const tbody = document.getElementById("tbody");

    tbody.addEventListener("click", function(event) {
        if (event.target.getAttribute("class") === "menu") {
        	closeAll();
            event.target.parentNode.children[1].style.display = "block";
        }
    });

    const body = document.getElementsByTagName("body")[0];
    
    body.addEventListener("click", function(event) {
        console.log(event.target.tagName);
        if (event.target.tagName != "BODY") return;
        closeAll();
        
    });

    tbody.addEventListener("click", function(event){
    		if(event.target.parentNode.parentNode.className === "action"){
    			closeAll();
    			if(event.target.src.search(/check\.svg/) != -1)  addToDeleteElems(event.target.parentNode.parentNode.parentNode.parentNode);
    			if(event.target.src.search(/delete\.svg/) != -1) event.target.parentNode.parentNode.parentNode.parentNode.remove();
    			if(event.target.src.search(/edit\.svg/) != -1){ console.log("редагувати");editData(event.target);}
    		}
    	});

    const edit = document.getElementById("edit");
	    edit.addEventListener("click",function(){
	    	closeAll();
	    	if(!checkInputs()) return;
	    	insertFrashData();
	    });

	const del = document.getElementById("delete");

	del.addEventListener("click",function(){
		closeAll();
		for(let i=0; i<delElems.length; i++) delElems[i].remove();
			del.style.display = "none";
   			edit.style.display = "none";
   			send.style.display = "inline";
	});



    function closeAll(){
    	let openedActions = document.getElementsByClassName("action");
        for (let i = 0; i < openedActions.length; i++) {
            openedActions[i].style.display = "none";
        }
    }
    function checkInputs() {
        let name = document.getElementById("name"),
            surname = document.getElementById("surname"),
            email = document.getElementById("email"),
            erorr = 0;

        console.log(` name ${name.value} surname ${surname.value} email ${email.value}`);
        if (name.value === "") {
            name.placeholder = "Введіть ім'я";
            name.style.border ="1px solid red";
            erorr++;
        }
        if (surname.value === "") {
            surname.placeholder = "Введіть прізвище";
            surname.style.border ="1px solid red";
            erorr++;
        }
        if (email.value === "") {
            email.placeholder = "Введіть email";
            email.style.border ="1px solid red";
            erorr++;
        } else {
        	if(email.value.search(/.*@.+\.[a-z]{2,}/g) * -1 === 1){ email.style.border ="1px solid red"; erorr++;}
        }

        if (!erorr){ 
        	email.style.border ="1px solid black";
        	surname.style.border ="1px solid black";
        	name.style.border ="1px solid black"

        	return { name: name.value, surname: surname.value, email: email.value, date: getDate() };
        }
        return 0;
    }

    function addData(obj) {
    	let tbody = document.getElementById("tbody");
        let tr = document.createElement("tr");
            let name = document.createElement("td");
            name.innerHTML = obj.name;
        	let surname = document.createElement("td");
        	surname.innerHTML = obj.surname;
        	email = document.createElement("td");
        	email.innerHTML = obj.email;
        	date = document.createElement("td");
        	date.innerHTML = obj.date;
        	tr.append(createActions());
        	tr.append(name);
        	tr.append(surname);
        	tr.append(email);
        	tr.append(date);
        	tbody.append(tr);


    }


    function getDate() {
        const date = new Date();
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let min = date.getMinutes();
        if (min < 10) min = '0' + min;
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
        return `${hours}:${min} ${mm}.${dd}.${date.getFullYear()}`;
    }

    function createActions(){
    	let td = document.createElement("td");
    	td.className = "p-10 p-ab b-none baseline";
    	let img = document.createElement("img");
    		img.src = "img/baseline.svg";
    		img.className = "menu";
    	let ul = document.createElement("ul");
    		ul.className = "action"
    		let li1 = document.createElement("li");
    			li1.innerHTML = "<img src='img/delete.svg'>";
    		let li2 = document.createElement("li");
    			li2.innerHTML = "<img src='img/edit.svg'>";
    		let li3 = document.createElement("li");
    			li3.innerHTML = "<img src='img/check.svg'>";
    	ul.append(li1);
    	ul.append(li2);
    	ul.append(li3);
    	td.append(img);
    	td.append(ul);
    	return td;
    }
   
   function editData(elem){
	   	del.style.display = "none";
	   	send.style.display = "none";
	   	edit.style.display = "inline";
	   	editElem = elem.parentNode.parentNode.parentNode.parentNode;
	   	document.getElementById("name").value = editElem.children[1].innerHTML;
	   	document.getElementById("name").focus();
	    document.getElementById("surname").value = editElem.children[2].innerHTML;
	    document.getElementById("email").value = editElem.children[3].innerHTML;
	   	console.log(editElem);
   }

   function insertFrashData(){
	   	del.style.display = "none";
	   	edit.style.display = "none";
	   	send.style.display = "inline";
	   	editElem.children[1].innerHTML = document.getElementById("name").value;
	   	editElem.children[2].innerHTML = document.getElementById("surname").value;
	   	editElem.children[3].innerHTML = document.getElementById("email").value;
	}

   function addToDeleteElems(elem){
   		del.style.display = "inline";
   		edit.style.display = "none";
   		send.style.display = "none";
   		elem.style.backgroundColor = "rgb(230, 230, 230)";
   		elem.children[0].style.backgroundColor = "white";
   		delElems.push(elem);
   		console.log(delElems);
   }

   let editElem, delElems = [];

   

}