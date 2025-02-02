// Equipement
const API_URL = "http://localhost:3000";
const USERS_URL = API_URL + "/users"

const roleBadges = {
	dev: "badge bg-primary", // Bleu
	designer: "badge bg-secondary", // Gris
	"project manager": "badge bg-warning text-dark", // Jaune
	"qa engineer": "badge bg-success", // Vert
	devops: "badge bg-danger", // Rouge
	"frontend dev": "badge bg-info", // Bleu ciel
	"backend dev": "badge bg-dark", // Noir
	"ux researcher": "badge bg-light text-dark", // Blanc cassé
	"fullstack dev": "badge bg-primary", // Bleu
	"product owner": "badge bg-warning text-dark", // Jaune
	"data scientist": "badge bg-success", // Vert
	"ai engineer": "badge bg-info", // Bleu ciel
	"qa automation": "badge bg-danger", // Rouge
	cto: "badge bg-dark", // Noir
	"system admin": "badge bg-secondary", // Gris
	"marketing manager": "badge bg-light text-dark", // Blanc cassé
	"content writer": "badge bg-primary", // Bleu
	"cloud architect": "badge bg-success", // Vert
	"scrum master": "badge bg-warning text-dark", // Jaune
	"data engineer": "badge bg-info", // Bleu ciel
};

async function requestData(url, method_http, data,  callback_bs = () => {}, callback_finish = () => {} ) {
	return await new Promise( (resolve,reject)=> {
		$.ajax({
			url: url,
			type: method_http,
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			beforeSend: function() {
				callback_bs()
			},
			complete: function() {
				callback_finish()
			},
			success: function(data) {
				resolve(data);
			},
			error: function(xhr) {
				console.error("Erreur Ajax: "+ xhr.statusText);
			}
		})
	})
}

async function fetchUsersRequest() {
	return await requestData(USERS_URL,"GET");
}

async function updateUserRequest(user,id) {
	return await requestData(`${USERS_URL}/${id}`,"PUT", user);
}

async function storeUserRequest(user) {
	return await requestData(`${USERS_URL}`,"POST", user);
}

async function deleteUserRequest(id) {
	return await requestData(`${USERS_URL}/${id}`,'DELETE');
}

function showUsers(users){
	users.forEach(function(user){


		// template string ``: ecrire du html en chaine de caractere avec des retours de ligne.
		// 1. creation de mon utilisateur cote HTML
		const $user = $(`
			<tr>
				<td><div class="d-flex justify-content-center align-items-center">${user.name}</div></td>
				<td><div class="d-flex justify-content-center align-items-center">${user.email}</div></td>
				<td><div class="d-flex justify-content-center align-items-center badge bg-secondary">${user.phone}</div></td>
				<td><div class="d-flex justify-content-center align-items-center ${roleBadges[user.role]}">${user.role}</div></td>
				<td><div class="d-flex justify-content-center align-items-center">${user.is_available ? '<i class="bi bi-check-circle-fill text text-success "></i>' : '<i class=" bi bi-x-circle-fill text text-danger"></i>'}</div></td>
				<td>
					<div class="d-flex justify-content-center align-items-center" style="gap: 1rem;">
						<button type="button" class="update-user badge bg-primary" data-json='${JSON.stringify(user)}' data-bs-toggle="modal" data-bs-target="#updateUser">Modifier</button>
						<button type="button" class="delete-user badge bg-danger" data-id='${user.id}'>Supprimer</button>
					</div>
				</td>
			</tr>
		`) 

		// 2. injection sur le DOM
		$("#users-table tbody").append($user)
	})
}

async function deleteUser(e){

	// Recuperer une information depuis un element - Parcours
	// 1. aller a l'element HTML parent: closest(selecteur)
	// 2. aller a l'element enfant: find(selecteur)
	// 3. recuperer la rangee
	var row = $(this).closest("tr");

	const ok = confirm("Voulez-vous supprimer cette utilisateur?")
	if(!ok) return; 
	
	let response = await deleteUserRequest($(this).data('id'));

	if(!response.user) alert("Erreur lors de la suppression de l'utilisateur")

	// 4. recuperer le nom (indicatif)
	const name = row.find("td:first div").text();



	// 6. supprimer en front l'utilisateur
	row.remove();

	// 7. monitorer le resultat
	// console.log(users)
}

function updateUserModal(){

	// 1. Recuperer les informations d'un utilisateur
	let user = $(this).data('json');
	console.log(user)
	cursor = $(this).closest('tr');

	// 2. Injection dans le formulaire de mis a jour d'utilisateur
	$("#updateUser [name=name]").val(user.name)
	$("#updateUser [name=email]").val(user.email)
	$("#updateUser [name=role]").val(user.role)
	$("#updateUser [name=phone]").val(user.phone)
	$("#updateUser [name=id]").val(user.id)


	// speciale pour les checkbox
	$("#updateUser [name=is_available]").prop("checked", user.is_available);
}

async function updateUser(e){

		// 1. recuperer les elements du formulaire de mis a jour utilisateur
		let user = {
			id: $("#updateUser [name=id]").val(),
			name: $("#updateUser [name=name]").val(),
			email: $("#updateUser [name=email]").val(),
			role:$("#updateUser [name=role]").val(),
			phone:$("#updateUser [name=phone]").val(),
			is_available:$("#updateUser [name=is_available]").is(":checked")
		}

		let response = await updateUserRequest(user,user.id);
		if(!('user' in response))

		// 2. injecter dans le DOM ces elements
		cursor.find("td:nth-child(1) div").text(user.name);
		cursor.find("td:nth-child(2) div").text(user.email);
		cursor.find("td:nth-child(3) div").text(user.phone);
		cursor.find("td:nth-child(4) div").text(user.role);
		cursor.find("td:nth-child(4) div").addClass(roleBadges[user.role])
		cursor.find("td:nth-child(5) div").html(user.is_available ? '<i class="bi bi-check-circle-fill text text-success "></i>' : '<i class=" bi bi-x-circle-fill text text-danger"></i>');
		
		// 3. fermer la popup
		$(".update-user--close").trigger('click')
	
		// 4. persister dans le data-json
		cursor.find("button.update-user").data('json', user);
}

async function storeUser(e){

	// 1. recuperer les elements du formulaire de mis a jour utilisateur
	let user = {
		name: $("#addUser [name=name]").val(),
		email: $("#addUser [name=email]").val(),
		role:$("#addUser [name=role]").val(),
		phone:$("#addUser [name=phone]").val(),
		is_available:$("#addUser [name=is_available]").is(":checked")
	}

	let response = await storeUserRequest(user);
	if(!('user' in response)) alert("Erreur lors de l'ajout utilisateur");
	
	const $user = $(`
		<tr>
			<td><div class="d-flex justify-content-center align-items-center">${user.name}</div></td>
			<td><div class="d-flex justify-content-center align-items-center">${user.email}</div></td>
			<td><div class="d-flex justify-content-center align-items-center badge bg-secondary">${user.phone}</div></td>
			<td><div class="d-flex justify-content-center align-items-center ${roleBadges[user.role]}">${user.role}</div></td>
			<td><div class="d-flex justify-content-center align-items-center">${user.is_available ? '<i class="bi bi-check-circle-fill text text-success "></i>' : '<i class=" bi bi-x-circle-fill text text-danger"></i>'}</div></td>
			<td>
				<div class="d-flex justify-content-center align-items-center" style="gap: 1rem;">
					<button type="button" class="update-user badge bg-primary" data-id='${user.id}' data-json='${JSON.stringify(user)}' data-bs-toggle="modal" data-bs-target="#updateUser">Modifier</button>
					<button type="button" class="delete-user badge bg-danger" data-id='${user.id}'>Supprimer</button>
				</div>
			</td>
		</tr>
	`);

	// 2. injecter dans le DOM ces elements
	$("#users-table tbody").append($user);



	// 3. fermer la popup
	$(".add-user--close").trigger('click')


	// 4. persister dans le data-json
	// cursor.find("button.update-user").data('json', user);
}

$(document).ready(async function(){
	var cursor = '';

	$("#users-table tbody").html(" ")

	var usersData = await fetchUsersRequest();

	// affiche les utilisateurs sur la page web
	showUsers(usersData.users)

	// modal
	$(".update-user").on("click", updateUserModal)

	// logique lie a la gestion utilisateur
	$(".delete-user").on("click", deleteUser)
	$(".update-user--save").on("click", updateUser)
	$(".add-user--save").on("click", storeUser)

})