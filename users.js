var users = [
	{
	name: "Zeev",
	email: "zeev@gmail.com",
	role: "dev",
	phone: "01782938490",
	is_available: false,
	},
	{
	name: "Aviva",
	email: "aviva@gmail.com",
	role: "designer",
	phone: "01782938491",
	is_available: true,
	},
	{
	name: "Lior",
	email: "lior@gmail.com",
	role: "project manager",
	phone: "01782938492",
	is_available: false,
	},
	{
	name: "Rivka",
	email: "rivka@gmail.com",
	role: "qa engineer",
	phone: "01782938493",
	is_available: true,
	},
	{
	name: "Noam",
	email: "noam@gmail.com",
	role: "devops",
	phone: "01782938494",
	is_available: true,
	},
	{
	name: "Yarden",
	email: "yarden@gmail.com",
	role: "frontend dev",
	phone: "01782938495",
	is_available: false,
	},
	{
	name: "Shira",
	email: "shira@gmail.com",
	role: "backend dev",
	phone: "01782938496",
	is_available: true,
	},
	{
	name: "Eitan",
	email: "eitan@gmail.com",
	role: "ux researcher",
	phone: "01782938497",
	is_available: true,
	},
	{
	name: "Tamar",
	email: "tamar@gmail.com",
	role: "fullstack dev",
	phone: "01782938498",
	is_available: false,
	},
	{
	name: "Daniel",
	email: "daniel@gmail.com",
	role: "product owner",
	phone: "01782938499",
	is_available: true,
	},
	{
	name: "Yael",
	email: "yael@gmail.com",
	role: "data scientist",
	phone: "01782938500",
	is_available: false,
	},
	{
	name: "Yonatan",
	email: "yonatan@gmail.com",
	role: "ai engineer",
	phone: "01782938501",
	is_available: true,
	},
	{
	name: "Michal",
	email: "michal@gmail.com",
	role: "qa automation",
	phone: "01782938502",
	is_available: true,
	},
	{
	name: "Oren",
	email: "oren@gmail.com",
	role: "cto",
	phone: "01782938503",
	is_available: false,
	},
	{
	name: "Gal",
	email: "gal@gmail.com",
	role: "system admin",
	phone: "01782938504",
	is_available: true,
	},
	{
	name: "Dalia",
	email: "dalia@gmail.com",
	role: "marketing manager",
	phone: "01782938505",
	is_available: false,
	},
	{
	name: "Moshe",
	email: "moshe@gmail.com",
	role: "content writer",
	phone: "01782938506",
	is_available: true,
	},
	{
	name: "Ronen",
	email: "ronen@gmail.com",
	role: "cloud architect",
	phone: "01782938507",
	is_available: false,
	},
	{
	name: "Lea",
	email: "lea@gmail.com",
	role: "scrum master",
	phone: "01782938508",
	is_available: true,
	},
	{
	name: "Boaz",
	email: "boaz@gmail.com",
	role: "data engineer",
	phone: "01782938509",
	is_available: true,
	}
];

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
						<button type="button" class="delete-user badge bg-danger">Supprimer</button>
					</div>
				</td>
			</tr>
		`) 

		// 2. injection sur le DOM
		$("#users-table tbody").append($user)
	})
}

function deleteUser(e){

	// Recuperer une information depuis un element - Parcours
	// 1. aller a l'element HTML parent: closest(selecteur)
	// 2. aller a l'element enfant: find(selecteur)
	// 3. recuperer la rangee
	var row = $(this).closest("tr");

	// 4. recuperer le nom (indicatif)
	const name = row.find("td:first div").text();
	alert('suppression utilisateur: '+name);

	// 5. nettoyer la liste
	users = users.filter(function(user){
		if(user.name === name) return;
		return user;
	})

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

	// speciale pour les checkbox
	$("#updateUser [name=is_available]").prop("checked", user.is_available);
}

function updateUser(e){

		// 1. recuperer les elements du formulaire de mis a jour utilisateur
		let user = {
			name: $("#updateUser [name=name]").val(),
			email: $("#updateUser [name=email]").val(),
			role:$("#updateUser [name=role]").val(),
			phone:$("#updateUser [name=phone]").val(),
			is_available:$("#updateUser [name=is_available]").is(":checked")
		}


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

function storeUser(e){

	// 1. recuperer les elements du formulaire de mis a jour utilisateur
	let user = {
		name: $("#addUser [name=name]").val(),
		email: $("#addUser [name=email]").val(),
		role:$("#addUser [name=role]").val(),
		phone:$("#addUser [name=phone]").val(),
		is_available:$("#addUser [name=is_available]").is(":checked")
	}
	users.push(user)
	
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
					<button type="button" class="delete-user badge bg-danger">Supprimer</button>
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

$(document).ready(function(){
	var cursor = '';

	$("#users-table tbody").html(" ")

	// affiche les utilisateurs sur la page web
	showUsers(users)

	// supprime un utilisateur
	$(".delete-user").on("click", deleteUser)

	// ouvre modal utilisateur, affiche donnee
	$(".update-user").on("click", updateUserModal)

	// enregistre nouvelle info. utilisateur
	$(".update-user--save").on("click", updateUser)
	$(".add-user--save").on("click", storeUser)

})