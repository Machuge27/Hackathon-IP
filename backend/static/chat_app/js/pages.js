const container = document.querySelector(".messages");
        const my_menu = document.querySelector(".myMenu");
        const close_svg1 = document.querySelector(".close-svg1");
        const svg_boxes = document.querySelector(".svg-boxes");
        const notices_page = document.querySelector(".notices-page");
        const msgs_page = document.querySelector(".msgs-page");
        const profile_page = document.querySelector(".profile-page");
        const home_page = document.querySelector(".home-page");
        const items = document.querySelectorAll(".list");
        let replySent = true;
        const loader = `<div class="loader"></div> `;
        const closeLite = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
      className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`;
        function activeLink() {
            items.forEach(item => {
                item.classList.remove("active");
            });
            this.classList.add("active");
        }
        items.forEach(item => {
            item.addEventListener("click", activeLink);
        });

        function openMyMenu() {
            svg_boxes.classList.toggle("hidden");
            close_svg1.classList.toggle("hidden");
            // container.classList.toggle("hidden");
            my_menu.style.display = "flex";
            console.log("Fetching Notices, Messages etc");
            container.innerHTML = `
<div class="myMenu">
                <div class="nav">
                    <ul>
                        <li class="list active">
                            <a href="#" onclick="showPage('notices')" class="notices">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                                    </svg>
                                </span>
                                <span class="text">Notices</span>
                            </a>
                        </li>
                        <li class="list">
                            <a href="#" onclick="showPage('msgs')" class="msgs">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                </span>
                                <span class="text">Inbox</span>
                            </a>
                        </li>
                        <li class="list">
                            <a href="#" onclick="showPage('profile')" class="profile">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </span>
                                <span class="text">Profile</span>
                            </a>
                        </li>
                        <li class="list">
                            <a href="#" onclick="showPage('home')" class="home">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </span>
                                <span class="text">Home</span>
                            </a>
                        </li>
                        <div class="indicator"></div>
                    </ul>
                </div>
                <section id="notices" class="page notices-page active">
                    <p class="title">Notice Board:</p>
                    <span class="content1">
                        <div class="notice">
                            <span class="row jsb" style="align-items: center">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>Notice
                                </h3>
                                <span class="date">2024-07-28</span>
                            </span>
                            <p>This is the description for Notice 1.</p>
                            <img src="./static/icon1.PNG" alt="Notice 1 Image" />
                            <a href="./static/icon1.PNG" download><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg></a>
                        </div>
                        <div class="notice">
                            <span class="row jsb">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>Notice
                                </h3>
                                <span class="date">2024-07-30</span>
                            </span>
                            <p>This is the description for Notice 2.</p>
                            <img src="./static/icon.PNG" alt="Notice 2 Image" />
                            <a href="./static/icon.PNG" download>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </a>
                        </div>
                        <br />
                    </span>
                </section>
                <section id="msgs" class="page msgs-page">
                    <div class="msg">
                        <span class="row">
                            <img src="./static/icon1.PNG" alt="Sender Image" class="sender-picture" />
                            <div style="width: 100%">
                                <h3 class="sender">Admin</h3>
                                <p>
                                    This is an important message from the admin.
                                    Please read it carefully.
                                    <br><a href="http://example.com">http://example.com</a>
                                </p>
                                <span class="row jsb" style="align-items: center">
                                    <span class="date">2024-07-28</span>
                                    <span>
                                        <button onclick="Reply(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="#84f" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </button>
                                        <button onclick="markRead(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button class="delete" onclick="deleteMessage(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="#f4a" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </span>
                                </span>
                            </div>
                            <span class="notification"></span>
                        </span>
                    </div>
                    <div class="msg">
                        <span class="row">
                            <img src="./static/icon.PNG" alt="Sender Image" class="sender-picture" />
                            <div style="width: 100%">
                                <h3>James</h3>
                                <p>
                                    Hello.
                                </p>
                                <span class="row jsb" style="align-items: center">
                                    <span class="date">2024-07-25</span>
                                    <span>
                                        <button onclick="Reply(this)">
                                            <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                                                <style type="text/css">
                                                    .st0 {
                                                        fill: none;
                                                        stroke: #84f;
                                                        stroke-width: 2;
                                                        stroke-linecap: round;
                                                        stroke-linejoin: round;
                                                        stroke-miterlimit: 10;
                                                    }
                                                </style>
                                                <path class="st0" d="M14.3,8.1V6c0-0.8-0.8-1.3-1.4-0.8l-6.5,6c-0.5,0.4-0.5,1.2,0,1.6l6.5,6c0.6,0.5,1.4,0,1.4-0.8v-2h0.8
	c6.8,0,13,4.3,15.8,11C31,16.8,23.6,8.6,14.3,8.1z" />
                                            </svg>
                                        </button>
                                        <button onclick="markRead(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button class="delete" onclick="deleteMessage(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="#f4a" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </span>
                                </span>
                            </div>
                            <span class="notification"></span>
                        </span>
                    </div>
                    <div class="msg">
                        <span class="row">
                            <img src="./static/icon1.PNG" alt="Sender Image" class="sender-picture" />
                            <div style="width: 100%">
                                <h3 class="sender">Reminder</h3>
                                <p>
                                    Don't forget to submit your monthly report
                                    by the end of this week.
                                    Don't forget to submit your monthly report
                                    by the end of this week.
                                    Don't forget to submit your monthly report
                                    by the end of this week.
                                    by the end of this week.
                                </p>
                                <span class="row jsb" style="align-items: center">
                                    <span class="date">2024-07-25</span>
                                    <span>
                                        <button onclick="Reply(this)">
                                            <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                                                <style type="text/css">
                                                    .st0 {
                                                        fill: none;
                                                        stroke: #84f;
                                                        stroke-width: 2;
                                                        stroke-linecap: round;
                                                        stroke-linejoin: round;
                                                        stroke-miterlimit: 10;
                                                    }
                                                </style>
                                                <path class="st0" d="M14.3,8.1V6c0-0.8-0.8-1.3-1.4-0.8l-6.5,6c-0.5,0.4-0.5,1.2,0,1.6l6.5,6c0.6,0.5,1.4,0,1.4-0.8v-2h0.8
	c6.8,0,13,4.3,15.8,11C31,16.8,23.6,8.6,14.3,8.1z" />
                                            </svg>
                                        </button>
                                        <button onclick="markRead(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button class="delete" onclick="deleteMessage(this)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="#f4a" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </span>
                                </span>
                            </div>
                            <span class="notification"></span>
                        </span>
                    </div>
                </section>
                <section id="profile" class="page profile-page">
                    <div class="profile-info">
                        <img src="./static/icon.PNG" alt="Profile Picture" class="profile-picture" />
                        <div class="edit-profile">
                            <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg></button>
                        </div>
                        <div class="details">
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Email:</strong> johndoe@example.com</p>
                            <p><strong>Role:</strong> Developer</p>
                            <div class="row">
                                <button class="signout">Sign out</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="home" class="page home-page hidden">
                    <h3>Nothing, just a search bar to display</h3>
                    <div class="search">
                        <input type="search" name="stag" class="input" id="stag" placeholder="Search..." />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="s-icon-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </section>
            </div>
`;
        }


        function addMsg(messages) {
            container.innerHTML = `
                <p>These are the user messages.</p>
              `;
            console.log(container.innerText);
        }

        // Wait for the page to finish loading
        document.addEventListener("DOMContentLoaded", () => {
        svg_boxes.addEventListener("click", openMyMenu);
        close_svg1.addEventListener("click", () => {
            svg_boxes.classList.toggle("hidden");
            close_svg1.classList.toggle("hidden");
            my_menu.style.display = "none";
            addMsg(messages);
        });
            //addMsg(messages);
            document.querySelector('.msgs').click()
        });

        function showPage(pageId) {
            let pages = document.querySelectorAll(".page");
            pages.forEach(section => {
                section.classList.toggle("active", section.id === pageId);
                if (!section.querySelector(".loader")) {
                    section.insertAdjacentHTML("afterbegin", loader);
                }
                setTimeout(() => {
                    section.querySelector(".loader").remove();
                }, 2000);
            });
        }

        // Function to delete a message
        function deleteMessage(button) {
            button.closest(".msg").remove();
        }
        // Function to mark a message read
        function markRead(button) {
            const blueTick = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="double-check"><path fill="#07f" fill-rule="evenodd" d="M16.5303 6.46967C16.8232 6.76256 16.8232 7.23744 16.5303 7.53033L6.53033 17.5303C6.38968 17.671 6.19891 17.75 6 17.75 5.80109 17.75 5.61032 17.671 5.46967 17.5303L1.46967 13.5303C1.17678 13.2374 1.17678 12.7626 1.46967 12.4697 1.76256 12.1768 2.23744 12.1768 2.53033 12.4697L6 15.9393 15.4697 6.46967C15.7626 6.17678 16.2374 6.17678 16.5303 6.46967zM22.5303 6.46966C22.8232 6.76254 22.8232 7.23742 22.5303 7.53032L12.5308 17.5303C12.2379 17.8232 11.7631 17.8232 11.4702 17.5304L9.96975 16.0304C9.67681 15.7376 9.67674 15.2627 9.96959 14.9697 10.2624 14.6768 10.7373 14.6767 11.0303 14.9696L12.0004 15.9394 21.4697 6.46968C21.7625 6.17678 22.2374 6.17677 22.5303 6.46966z" clip-rule="evenodd"></path></svg>`;
            button.innerHTML = blueTick;
            const ntf =
                button.parentElement.parentElement.parentElement.parentElement.querySelector(
                    ".notification"
                );

            if (ntf) {
                ntf.remove();
            }
        }
        // Function to reply to a message
        function Reply(button) {
            button.nextElementSibling.click();
            console.log(button.closest('.msg').querySelector('.sender').textContent);

        }
                function Reply(button) {
            const msgDiv = button.closest('.msg');
            //console.log(messageDiv)
            const sender = msgDiv.querySelector('.sender').textContent;
            const sendersImage = msgDiv.querySelector('.sender-picture').src;
            const messageContent = msgDiv.querySelector('p').textContent;
            const messageDate = msgDiv.querySelector('.date').textContent;
                        // Create reply container
                        const replyContainer = document.createElement('div');
                        button.nextElementSibling.click();
                        replyContainer.classList.add('reply-container');
                        replyContainer.innerHTML = `
                    <div class="replied-message row">
                        <img src="${sendersImage}" alt="Receiver">
                        <span style="border-left: 1px solid #ccc;height:3lh;overflow:auto;">
                            <p><strong>Replying to:</strong> ${sender}</p>
                            <p>${messageContent}</p>
                        </span>
                        <span class="close" style="margin:0px; color:#333; cursor:pointer;" onclick="this.parentElement.parentElement.remove(); replySent=true">${closeLite}</span>
                    </div>
                    <div class="filePreview"></div>
                    <div class="reply-input">
                        <label for="image_uploads">
                            <input class="fileInput" type="file" name="image_uploads" accept=".png, .pdf" onchange="showPreview(event)" multiple />
                            <svg xmlns="http://www.w3.org/2000/svg" onclick="document.querySelector('.fileInput').click()" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </label>
            
                        <textarea class='textarea1' placeholder="Enter your reply here..."></textarea>
                            <svg xmlns="http://www.w3.org/2000/svg" onclick="sendReply(this)" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                            </svg>    
                    </div>
                `;
            
                        // Append reply container next to the original message
                        if (replySent) {
                            msgDiv.insertAdjacentElement('afterend', replyContainer);
                        }
                        replySent = false;
                        document.querySelector('.textarea1').focus();
                    }
                    // Function to handle image preview
        function showPreview(event) {
            const preview = event.target.parentElement.parentElement.previousElementSibling//('.filePreview');
            console.log(preview)
            while (preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }

            const curFiles = event.target.files;
            if (curFiles.length === 0) {
                const para = document.createElement("p");
                para.textContent = "No files currently selected for upload";
                preview.appendChild(para);
            } else {
                const list = document.createElement("ol");
                preview.appendChild(list);

                for (const file of curFiles) {
                    const listItem = document.createElement("li");
                    const para = document.createElement("p");
                    listItem.style.padding = '.3rem';
                    listItem.className="list";
                    para.className = 'para';
                    console.log(file.type);
                    if (validFileType(file)) {
                        para.innerHTML = `${file.name.split(" ", 1) + '...'}`;// <br> ${returnFileSize(file.size)}.`;

                        const reader = new FileReader();
                        const cl = document.createElement('span');
                        cl.innerHTML = `<span class="close" style="margin:0px; padding:0px; color:#aaa; cursor:pointer;" onclick="this.closest('.list').remove(); replySent=true">${closeLite};</span>`;
                        const imgSpan = document.createElement("span");
                        const image = document.createElement("img");
                        imgSpan.classList.add('row')
                        reader.onload = function (e) {
                            if (file.type.startsWith('image/')) {
                                image.src = e.target.result;
                                image.style.maxWidth = '100%';
                            } else if (file.type.startsWith('application/')) {
                                image.src = 'chat_app/static/chat_app/images/icon1.PNG'
                                image.style.maxHeight = '40px';
                                image.style.maxWidth = '40px';
                            }
                            image.style.display = "block";
                        };
                        reader.readAsDataURL(file);
                        imgSpan.appendChild(image);
                        imgSpan.appendChild(cl);
                        listItem.appendChild(imgSpan);
                        listItem.appendChild(para);
                    } else {
                        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                        listItem.appendChild(para);
                    }
                    list.appendChild(listItem);
                }
            }
        }
        const fileTypes = [
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon",
            "application/doc",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "video/mp4",
            "video/mkv",
            "audio/wav",
            "audio/acc"
        ];

        function validFileType(file) {
            return fileTypes.includes(file.type);
        }
        function returnFileSize(number) {
            if (number < 1024) {
                return `${number} bytes`;
            } else if (number >= 1024 && number < 1048576) {
                return `${(number / 1024).toFixed(1)} KB`;
            } else if (number >= 1048576) {
                return `${(number / 1048576).toFixed(1)} MB`;
            }
        }
    
        // Function to handle sending the reply
        function sendReply(button) {
            const replyDiv = button.parentElement.parentElement;
            const textArea = replyDiv.querySelector('textarea');
            const imagePreview = replyDiv.querySelector('#filePreview');


            if (textArea.value.trim() !== '' || imagePreview.src) {
                // You can handle sending the reply here
                // For now, we just remove the reply input after sending
                const x = document.createElement('div');
                const p = document.createElement('p');
                const btnSpan = document.createElement('span');
                btnSpan.innerHTML = `<span class="row jsb">
                                <span class="date" style="color: #777; padding: 0 .3rem; font-size:12px;">2024-07-28</span>
                                <span >
                                        <svg xmlns="http://www.w3.org/2000/svg" style="margin:0 .3rem;" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="delete" onclick="deleteMessage(this)" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="#f4a" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                </span>
                            </span>
                                    `;
                p.className = 'replied-text';
                p.textContent = textArea.value;
                x.classList.add(...["h"])
                x.appendChild(p);
                x.appendChild(btnSpan);
                textArea.parentElement.replaceWith(x);
                //alert('Reply sent with message: ' + textArea.value + (imagePreview.src ? ' and an image.' : ''));
                replySent = true;
                replyDiv.previousElementSibling.style.marginBottom = '.3rem';
                replyDiv.querySelectorAll('.close').forEach((item) => {
                    item.remove();
                });
                //replyDiv.remove();
            } else {
                alert('Please enter a reply or add an image.');
            }
        }