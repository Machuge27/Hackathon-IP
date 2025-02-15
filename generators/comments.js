
function addSuggestions() {
    const kk = document.querySelector("#kk")
    fetch('/generateSuggestions')
        .then((response) => {
            kk.innerText = "Suggested Prompts:";
            //kk.classList.remove("error");
            return response.json();
        })
        .then((list) => {
            //console.log("Suggestions", list)
            // Select the elements with class 'suggestion'
            const suggestionClass = document.querySelector(".suggestions");
            // Randomly select four strings from the list
            const shuffledlits = list.sort(() => Math.random() - 0.5);

            const selectedStrings = shuffledlits.slice(0, 4);
            console.log("Selected Suggestions", selectedStrings);
            if (kk.classList.contains("error")) {
                kk.classList.remove('error');

            }
            selectedStrings.forEach(function (string) {
                var h4Element = document.createElement("p");
                h4Element.className = "sug";
                h4Element.textContent = string;
                //h4Element.addEventListener('click', show());
                h4Element.addEventListener("click", () => {
                    userText = event.target.textContent;
                    modal.style.display = "none";
                    messageInput.value = userText;
                    sendMessage();
                    suggestionClass.innerHTML = "";
                    // Remove other suggestions
                    //addSuggestions();
                });
                suggestionClass.appendChild(h4Element);
            });
        })
}



function adsdMessage(sender, text, isPersonal) {
    const messageDiv = document.createElement("div");
    //const textDiv = document.querySelector(".text");
    const initialsHtml = `<span>
        <span id="initials" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" onclick="resetPwd()">
                <path fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clip-rule="evenodd" />
            </svg>
        </span>
    </span>`;
    messageDiv.className =
        "message" + (isPersonal ? " message-personal" : "");
    const avatarHtml = `
<figure class="avatar">
<img src="${isPersonal ? "./>staticicon1.PNG" : "./staticicon.PNG"}" alt="${sender} Avatar">
</figure>`;
    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("p");
    messageTextDiv.className = "text";

    // Check for links in the text and gather their positions
    const linkPositions = [];
    const links = [];
    const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
    let match;
    while ((match = regex.exec(text))) {
        linkPositions.push(match.index);
        links.push(match[0]);
    }
    console.log("Caught links: " + links + "\n");

    // Remove links from the text
    let textWithoutLinks = text.replace(
        /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g,
        ""
    );
    console.log("Text without links: " + textWithoutLinks);

    // Function to append characters with a delay and insert links at their positions
    const appendCharactersWithLinks = (
        characters,
        index,
        loaderStarted
    ) => {
        if (!loaderStarted) {
            startLoader(); // Start loader animation if not already started
        }
        if (index < characters.length) {
            const messageText = messageDiv.querySelector(".text");
            console.log("Length:" + characters.length);
            messageText.innerHTML += characters[index]; // Append character
            //messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom of messages
            // Insert links at their respective positions
            if (
                linkPositions.length > 0 &&
                index === linkPositions[0]
            ) {
                const linkIndex = linkPositions.shift();
                const link = text.substring(
                    linkIndex,
                    text.indexOf(">", linkIndex) + 1
                );

                console.log(link);
                //console.log(link.target)
                messageText.innerHTML += link;
            }
            if (index === characters.length - 1) {
                stopLoader(); // Stop loader animation after all characters have been displayed
            } else {
                setTimeout(() => {
                    appendCharactersWithLinks(
                        characters,
                        index + 1,
                        true
                    ); // Call recursively to append the next character after a delay
                }, 10); // Adjust the delay time as needed
            }
        }
    };

    const messageTextHtml = `<div class="message-text"><p class="text">${textWithoutLinks}</p>
<div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
</div>`;

    messageDiv.innerHTML = isPersonal
        ? messageTextHtml + avatarHtml
        : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        const characters = messageText.innerHTML.split("");
        messageText.innerHTML = "";
        appendCharactersWithLinks(characters, 0, false);
    }
}



!(function () {
    try {
        var d = document.documentElement,
            c = d.classList;
        c.remove("light", "dark");
        var e = localStorage.getItem("theme");
        if ("system" === e || (!e && true)) {
            var t = "(prefers-color-scheme: dark)",
                m = window.matchMedia(t);
            if (m.media !== t || m.matches) {
                d.style.colorScheme = "dark";
                c.add("dark");
            } else {
                d.style.colorScheme = "light";
                c.add("light");
            }
        } else if (e) {
            c.add(e || "");
        }
        if (e === "light" || e === "dark") d.style.colorScheme = e;
    } catch (e) { }
})();

const pwd = document.getElementById("pwd");
const chk = document.getElementById("chk");

chk.onchange = function (e) {
    pwd.type = chk.checked ? "text" : "password";
};
const pwd1 = document.getElementById("pwd1");
const chk1 = document.getElementById("chk1");

chk1.onchange = function (e) {
    pwd1.type = chk1.checked ? "text" : "password";
};



// Function to randomly select four strings from the list and append them to elements with class 'suggestion'
function addSuggestions() {
    const kk = document.querySelector("#kk")
    const messageText = messageInput.value.trim();
    const prompt = { "prompt": messageText };
    fetch('/generateSuggestions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt)
    })
        .then((response) => {
            kk.innerText = "Suggested Prompts:";
            //kk.classList.remove("error");
            return response.json();
        })
        .then((list) => {
            //console.log("Suggestions", list)
            // Select the elements with class 'suggestion'
            // Randomly select four strings from the list
            const shuffledList = list.sort(() => Math.random() - 0.5);

            //const selectedStrings = shuffledList.slice(0, 4);
            const selectedStrings = shuffledList;
            console.log("Selected Suggestions", selectedStrings);
            selectedStrings.forEach(function (string) {
                var h4Element = document.createElement("p");
                h4Element.className = "sug";
                h4Element.textContent = string;
                //h4Element.addEventListener('click', show());
                h4Element.addEventListener("click", () => {
                    userText = event.target.textContent;
                    modal.style.display = "none";
                    messageInput.value = userText;
                    sendMessage();
                    suggestions.innerHTML = "";
                    // Remove other suggestions
                    //addSuggestions();
                });
                suggestions.appendChild(h4Element);
            });
        })
        .catch((error) => {
            kk.innerText = "Error fetching suggestions!!";
            kk.classList.add('error');
            console.log("Error fetching suggestions!!", error);

        });
}

/* ************************** */
function addSuggestions(suggestions) {
    const suggestionClass = document.querySelector(".suggestions");
    suggestionClass.innerHTML = ""; // Clear existing suggestions

    suggestions.forEach(function (string) {
        var pElement = document.createElement("p");
        pElement.className = "sug";
        pElement.textContent = string;
        pElement.addEventListener("click", (event) => {
            const userText = event.target.textContent;
            document.querySelector("#message").value = userText;
            sendMessage();  // Fetch and display new suggestions based on the selected one
            suggestionClass.innerHTML = ""; // Clear suggestions after selecting one
        });
        suggestionClass.appendChild(pElement);
    });
}

function sendMessage() {
    const messageInput = document.querySelector("#message");
    const prompt = { "prompt": messageInput.value };

    fetch('/getResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response", data);
            const responseText = data.response;
            const suggestions = data.suggestions;

            // Display the response
            const chatContainer = document.querySelector(".chat-container");
            const responseDiv = document.createElement("div");
            responseDiv.className = "chat-response";
            responseDiv.innerHTML = `<p>${responseText}</p>`;
            chatContainer.appendChild(responseDiv);

            // Update suggestions
            addSuggestions(suggestions);

            // Clear the input field
            messageInput.value = "";
        })
        .catch((error) => {
            console.log("Error fetching response!!", error);
        });
}
document.addEventListener("DOMContentLoaded", () => {
    const initialSuggestions = {{ FSug| tojson
}};
addSuggestions(initialSuggestions);

document.getElementById("submit").addEventListener("click", sendMessage);
  });
/*
< !DOCTYPE html >
  <html lang="en">
      <head>
          <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Chatbot</title>
                  <script>

                  </script>
              </head>
              <body>
                  <input type="text" id="message" placeholder="Enter your message here">
                      <button id="submit">Submit</button>
                      <div class="chat-container"></div>
                      <div class="suggestions"></div>
              </body>
          </html>

          */




function addMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("Response from E", text);
    console.log("isit", isPersonal);
    const messageDiv = document.createElement("div");
    const initialsHtml = `<span>
                    <span id="initials" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" onclick="resetPwd()">
                            <path fill-rule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </span>`;
    messageDiv.className =
        "message" + (isPersonal ? " message-personal" : "");
    const avatarHtml = `
            <figure class="avatar">
            <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
            </figure>`;
    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("p");
    messageTextDiv.className = "text";
    messageTextDiv.innerText = "";

    // Check for links in the text and gather their positions
    let parsedResponse = [];
    let regex = /(<a href="[^"]+">[^<]+<\/a>|[^<]+)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        parsedResponse.push(match[0]);
    }

    let charIndex = 0;
    let partIndex = 0;
    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const part = parsedResponse[partIndex];
            if (part.startsWith("<a")) {
                messageTextDiv.innerHTML += part;
                partIndex++;
                charIndex = 0; // Reset charIndex for the next part
            } else {
                if (charIndex < part.length) {
                    messageTextDiv.innerHTML += part[charIndex];
                    charIndex++;
                } else {
                    charIndex = 0;
                    partIndex++;
                }
            }
            if (partIndex < parsedResponse.length) {
                setTimeout(typeResponse, 20); // Adjust the delay time as needed
            } else {
                stopLoader();
            }
        }
    };

    const messageTextHtml = `<div class="message-text"><p class="text"></p>
            <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
            </div>`;

    messageDiv.innerHTML = isPersonal
        ? messageTextHtml + avatarHtml
        : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const messageText = messageDiv.querySelector(".text");
    if (!isPersonal) {
        messageText.innerHTML = "";
        typeResponse();
    } else {
        messageText.innerHTML = text;
    }
}



function addmMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
                <figure class="avatar">
                    <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
                </figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                messageText.innerHTML += part.match;
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === 'plainText') {
                    element = document.createElement('span');
                    messageText.appendChild(element);
                    typeElement(element, part.match, 0, () => {
                        partIndex++;
                        typeResponse();
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        partIndex++;
                        typeResponse();
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        partIndex++;
                        typeResponse();
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ol') {
                    element = document.createElement('ol');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    messageText.appendChild(element);
                    const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeElement(li, olText, 0, () => {
                        partIndex++;
                        typeResponse();
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ul') {
                    element = document.createElement('ul');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    messageText.appendChild(element);
                    const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeElement(li, ulText, 0, () => {
                        partIndex++;
                        typeResponse();
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        } else {
            stopLoader();
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            element.innerHTML += content[index];
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 30); // Adjust the delay time as needed
        } else {
            callback();
        }
    };

    const messageTextHtml = `
                <div class="message-text">
                    <div class="text"></div>
                    <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
                </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}
function parsekText(text) {
    const patterns = [
        { type: 'link', regex: /<a href="[^"]+">[^<]+<\/a>/ },
        { type: 'header', regex: /###([^#]+)###/ },
        { type: 'subheader', regex: /\*\*\*([^*]+)\*\*\*/ },
        { type: 'ol', regex: /-#([^#]*)-#/ },
        { type: 'ul', regex: /-\*([^*]*)-\*/ }
    ];

    let elements = [];
    let index = 0;

    while (index < text.length) {
        let matched = false;

        for (const { type, regex } of patterns) {
            const match = regex.exec(text.slice(index));
            if (match && match.index === 0) {
                elements.push({ type, match: match[0], index });
                index += match[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            let nextIndex = text.length;

            for (const { regex } of patterns) {
                const nextMatch = regex.exec(text.slice(index));
                if (nextMatch && nextMatch.index !== 0 && index + nextMatch.index < nextIndex) {
                    nextIndex = index + nextMatch.index;
                }
            }

            const plainTextMatch = text.slice(index, nextIndex);
            if (plainTextMatch.trim()) {
                elements.push({ type: 'plainText', match: plainTextMatch, index });
            }
            index = nextIndex;
        }
    }

    return elements;
}

function addMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
                <figure class="avatar">
                    <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
                </figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === 'plainText') {
                    element = document.createElement('span');
                    messageText.appendChild(element);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ol') {
                    element = document.createElement('ol');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    messageText.appendChild(element);
                    const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeElement(li, olText, 0, () => {
                        checkNextLink(li);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ul') {
                    element = document.createElement('ul');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    messageText.appendChild(element);
                    const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeElement(li, ulText, 0, () => {
                        checkNextLink(li);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        } else {
            stopLoader();
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            element.innerHTML += content[index];
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            callback();
        }
    };

    const appendLink = (element, link) => {
        element.innerHTML += link;
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    const messageTextHtml = `
                <div class="message-text">
                    <div class="text"></div>
                    <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
                </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}


/****************PARSETEXT*************** */
function parseText(text) {
    // Define patterns for different types of elements
    const patterns = [
        { type: 'link', regex: /<a href="[^"]+">[^<]+<\/a>/ }, // Matches HTML anchor tags
        { type: 'header', regex: /###([^#]+)###/ },            // Matches custom header format ###header###
        { type: 'subheader', regex: /\*\*\*([^*]+)\*\*\*/ },   // Matches custom subheader format ***subheader***
        { type: 'ol', regex: /-#([^#]*)-#/ },                  // Matches custom ordered list item format -#item-#
        { type: 'ul', regex: /-\*([^*]*)-\*/ },                // Matches custom unordered list item format -*item-*
        { type: 'reset', regex: /£\|/ },                       // Matches custom reset sequence £|
        { type: 'override', regex: /£\d+\|/ }                  // Matches custom override sequence £number|
    ];

    let elements = [];  // Array to hold the parsed elements
    let index = 0;      // Current position in the text
    let olIndex = 1;    // Current ordered list index

    // Loop through the text until the end
    while (index < text.length) {
        let matched = false;

        // Check each pattern to see if it matches the current position in the text
        for (const { type, regex } of patterns) {
            const match = regex.exec(text.slice(index));
            if (match && match.index === 0) {
                let elementText = match[0];

                // Handle reset sequence
                if (type === 'reset') {
                    olIndex = 1;  // Reset ordered list index
                    elements.push({ type, match: elementText, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Handle override sequence
                if (type === 'override') {
                    // Extract the new olIndex from the override sequence
                    olIndex = parseInt(elementText.match(/\d+/)[0], 10);
                    elements.push({ type, match: elementText, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Special handling for ordered list items
                if (type === 'ol') {
                    const listType = 'ol';
                    const listItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(elementText.slice(itemIndex));
                        if (linkMatch && linkMatch.index === 0) {
                            listItems.push({ type: 'link', match: linkMatch[0], index: itemIndex });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf('<a href=', itemIndex);
                            const endIndex = nextLinkIndex !== -1 ? nextLinkIndex : elementText.length;
                            const plainTextMatch = elementText.slice(itemIndex, endIndex);
                            if (plainTextMatch.trim()) {
                                listItems.push({ type: 'plainText', match: plainTextMatch, index: itemIndex });
                            }
                            itemIndex = endIndex;
                        }
                    }

                    // Add the list item with the numbering adjusted and nested structure
                    elements.push({ type: listType, match: `${olIndex}. `, subItems: listItems, index });
                    olIndex++; // Increment the ordered list index
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Special handling for unordered list items
                if (type === 'ul') {
                    const listType = 'ul';
                    const listItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(elementText.slice(itemIndex));
                        if (linkMatch && linkMatch.index === 0) {
                            listItems.push({ type: 'link', match: linkMatch[0], index: itemIndex });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf('<a href=', itemIndex);
                            const endIndex = nextLinkIndex !== -1 ? nextLinkIndex : elementText.length;
                            const plainTextMatch = elementText.slice(itemIndex, endIndex);
                            if (plainTextMatch.trim()) {
                                listItems.push({ type: 'plainText', match: plainTextMatch, index: itemIndex });
                            }
                            itemIndex = endIndex;
                        }
                    }

                    // Add the list item with nested structure
                    elements.push({ type: listType, match: '', subItems: listItems, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Add the matched element to the array if no inner link was found
                elements.push({ type, match: elementText, index });
                index += match[0].length; // Move index past the matched element
                matched = true;
                break;
            }
        }

        if (!matched) {
            let nextIndex = text.length;

            // Find the next match of any pattern in the remaining text
            for (const { regex } of patterns) {
                const nextMatch = regex.exec(text.slice(index));
                if (nextMatch && nextMatch.index !== 0 && index + nextMatch.index < nextIndex) {
                    nextIndex = index + nextMatch.index;
                }
            }

            const plainTextMatch = text.slice(index, nextIndex); // Get plain text until the next match
            if (plainTextMatch.trim()) {
                elements.push({ type: 'plainText', match: plainTextMatch, index });
            }
            index = nextIndex; // Move index to the next potential match position
        }
    }

    return elements; // Return the array of parsed elements
}

/***************ADD MESSAGE********** */


function addMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
    </figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === 'reset') {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'plainText') {
                    element = document.createElement('span');
                    messageText.appendChild(element);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ol') {
                    element = document.createElement('ol');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.classList.add('un_li')
                    messageText.appendChild(element);
                    const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeElement(li, olText, 0, () => {
                        checkNextLink(li);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ul') {
                    element = document.createElement('ul');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeElement(li, ulText, 0, () => {
                        checkNextLink(li);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        } else {
            stopLoader();
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            element.innerHTML += content[index];
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            callback();
        }
    };

    const appendLink = (element, link, position) => {
        console.log("Position: ", position)
        element.innerHTML += link;
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    const messageTextHtml = `
    <div class="message-text">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}



/*********** */

function addMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
    </figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let olIndex = 1;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match);
                partIndex++;
                typeResponse();
            } else {
                let element;
                if (part.type === 'plainText') {
                    element = document.createElement('span');
                    messageText.appendChild(element);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'reset') {
                    olIndex = 1;
                    partIndex++;
                    typeResponse();
                } else if (part.type === 'override') {
                    olIndex = parseInt(part.match.replace(/£(\d+)\|/, '$1'), 10);
                    partIndex++;
                    typeResponse();
                } else if (part.type === 'ol') {
                    const ol = document.createElement('ol');
                    element = document.createElement('li');
                    ol.appendChild(element);
                    messageText.appendChild(ol);
                    typeListItems(element, part.match, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'ul') {
                    const ul = document.createElement('ul');
                    element = document.createElement('li');
                    ul.appendChild(element);
                    messageText.appendChild(ul);
                    typeListItems(element, part.match, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            stopLoader();
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            element.innerHTML += content[index];
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            callback();
        }
    };

    const appendLink = (element, link) => {
        const linkElement = document.createElement('span');
        linkElement.innerHTML = link;
        element.appendChild(linkElement);
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    const typeListItems = (listElement, listItems, callback) => {
        console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                const listItem = listItems[itemIndex];
                const li = document.createElement('li');
                listElement.appendChild(li);

                if (listItem.type === 'link') {
                    appendLink(li, listItem.match);
                    itemIndex++;
                    typeNextItem();
                } else {
                    let liText = '';

                    if (listItem.type === 'ul') {
                        liText = listItem.match.replace(/-\*([^*]*)-\*|-\*/, '$1');
                    } else if (listItem.type === 'ol') {
                        liText = listItem.match.replace(/-#([^#]*)-#|-#/, '$1');
                    }

                    typeElement(li, liText, 0, () => {
                        checkNextLink(li);
                        itemIndex++;
                        typeNextItem();
                    });
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const messageTextHtml = `
    <div class="message-text">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}


/************ */
function addMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
    </figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let olIndex = 1;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match);
                partIndex++;
                typeResponse();
            } else {
                let element;
                if (part.type === 'plainText') {
                    element = document.createElement('span');
                    messageText.appendChild(element);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'reset') {
                    olIndex = 1;
                    partIndex++;
                    typeResponse();
                } else if (part.type === 'override') {
                    olIndex = parseInt(part.match.replace(/£(\d+)\|/, '$1'), 10);
                    partIndex++;
                    typeResponse();
                } else if (part.type === 'ol') {
                    const ol = document.createElement('ol');
                    element = document.createElement('li');
                    ol.appendChild(element);
                    messageText.appendChild(ol);
                    typeListItems(element, part.match, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'ul') {
                    const ul = document.createElement('ul');
                    element = document.createElement('li');
                    ul.appendChild(element);
                    messageText.appendChild(ul);
                    typeListItems(element, part.match, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            stopLoader();
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            element.innerHTML += content[index];
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            callback();
        }
    };

    const appendLink = (element, link) => {
        const linkElement = document.createElement('span');
        linkElement.innerHTML = link;
        element.appendChild(linkElement);
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    const typeListItems = (listElement, listItems, callback) => {
        console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                const listItem = listItems[itemIndex];
                const li = document.createElement('li');
                listElement.appendChild(li);

                let liText = listItem.match;

                // Handle regular expressions only for the first and last item
                if (listItem.type === 'ul' && itemIndex === 0) {
                    liText = listItem.match.replace(/^\*([^*]*)\*|^-\*/, '$1');
                } else if (listItem.type === 'ul' && itemIndex === listItems.length - 1) {
                    liText = listItem.match.replace(/-\*$/, '');
                } else if (listItem.type === 'ol' && itemIndex === 0) {
                    liText = listItem.match.replace(/^\#([^#]*)\#|^#/, '$1');
                } else if (listItem.type === 'ol' && itemIndex === listItems.length - 1) {
                    liText = listItem.match.replace(/-#$/, '');
                }

                if (listItem.type === 'link') {
                    appendLink(li, liText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    typeElement(li, liText, 0, () => {
                        checkNextLink(li);
                        itemIndex++;
                        typeNextItem();
                    });
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const messageTextHtml = `
    <div class="message-text">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}




function parseText(text) {
    // Define patterns for different types of elements
    const patterns = [
        { type: 'link', regex: /<a href="[^"]+">[^<]+<\/a>/ }, // Matches HTML anchor tags
        { type: 'header', regex: /###([^#]+)###/ },            // Matches custom header format ###header###
        { type: 'subheader', regex: /\*\*\*([^*]+)\*\*\*/ },   // Matches custom subheader format ***subheader***
        { type: 'ol', regex: /-#([^#]*)-#/ },                  // Matches custom ordered list item format -#item-#
        { type: 'ul', regex: /-\*([^*]*)-\*/ },                // Matches custom unordered list item format -*item-*
        { type: 'reset', regex: /!\|/ },                       // Matches custom reset sequence £|
        { type: 'override', regex: /!\d+\|/ },                  // Matches custom override sequence |
        { type: 'expl', regex: /-\|([^\|]*)-\|/ }                  // Matches custom explanation |
    ];

    let elements = [];  // Array to hold the parsed elements
    let index = 0;      // Current position in the text
    let olIndex = 1;    // Current ordered list index

    // Loop through the text until the end
    while (index < text.length) {
        let matched = false;

        // Check each pattern to see if it matches the current position in the text
        for (const { type, regex } of patterns) {
            const match = regex.exec(text.slice(index));
            if (match && match.index === 0) {
                let elementText = match[0];

                // Handle reset sequence
                if (type === 'reset') {
                    olIndex = 1;  // Reset ordered list index
                    elements.push({ type, match: elementText, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Handle override sequence
                if (type === 'override') {
                    // Extract the new olIndex from the override sequence
                    olIndex = parseInt(elementText.match(/\d+/)[0], 10);
                    elements.push({ type, match: elementText, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Handling explanation text
                if (type === 'expl') {
                    const listType = 'expl';
                    const explItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(elementText.slice(itemIndex));
                        if (linkMatch && linkMatch.index === 0) {
                            explItems.push({ type: 'link', match: linkMatch[0], index: itemIndex });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf('<a href=', itemIndex);
                            const endIndex = nextLinkIndex !== -1 ? nextLinkIndex : elementText.length;
                            const plainTextMatch = elementText.slice(itemIndex, endIndex);
                            if (plainTextMatch.trim()) {
                                explItems.push({ type: 'plainText', match: plainTextMatch, index: itemIndex });
                            }
                            itemIndex = endIndex;
                        }
                    }
                    // Add the list item with the numbering adjusted and nested structure
                    elements.push({ type: listType, match: `${olIndex}. `, subItems: explItems, index });
                    olIndex++; // Increment the ordered list index
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Special handling for ordered list items
                if (type === 'ol') {
                    const listType = 'ol';
                    const listItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(elementText.slice(itemIndex));
                        if (linkMatch && linkMatch.index === 0) {
                            listItems.push({ type: 'link', match: linkMatch[0], index: itemIndex });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf('<a href=', itemIndex);
                            const endIndex = nextLinkIndex !== -1 ? nextLinkIndex : elementText.length;
                            const plainTextMatch = elementText.slice(itemIndex, endIndex);
                            if (plainTextMatch.trim()) {
                                listItems.push({ type: 'plainText', match: plainTextMatch, index: itemIndex });
                            }
                            itemIndex = endIndex;
                        }
                    }

                    // Add the list item with the numbering adjusted and nested structure
                    elements.push({ type: listType, match: `${olIndex}. `, subItems: listItems, index });
                    olIndex++; // Increment the ordered list index
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Special handling for unordered list items
                if (type === 'ul') {
                    const listType = 'ul';
                    const listItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(elementText.slice(itemIndex));
                        if (linkMatch && linkMatch.index === 0) {
                            listItems.push({ type: 'link', match: linkMatch[0], index: itemIndex });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf('<a href=', itemIndex);
                            const endIndex = nextLinkIndex !== -1 ? nextLinkIndex : elementText.length;
                            const plainTextMatch = elementText.slice(itemIndex, endIndex);
                            if (plainTextMatch.trim()) {
                                listItems.push({ type: 'plainText', match: plainTextMatch, index: itemIndex });
                            }
                            itemIndex = endIndex;
                        }
                    }

                    // Add the list item with nested structure
                    elements.push({ type: listType, match: '', subItems: listItems, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Add the matched element to the array if no inner link was found
                elements.push({ type, match: elementText, index });
                index += match[0].length; // Move index past the matched element
                matched = true;
                break;
            }
        }

        if (!matched) {
            let nextIndex = text.length;

            // Find the next match of any pattern in the remaining text
            for (const { regex } of patterns) {
                const nextMatch = regex.exec(text.slice(index));
                if (nextMatch && nextMatch.index !== 0 && index + nextMatch.index < nextIndex) {
                    nextIndex = index + nextMatch.index;
                }
            }

            const plainTextMatch = text.slice(index, nextIndex); // Get plain text until the next match
            if (plainTextMatch.trim()) {
                elements.push({ type: 'plainText', match: plainTextMatch, index });
            }
            index = nextIndex; // Move index to the next potential match position
        }
    }

    return elements; // Return the array of parsed elements
}


function addMessage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
    </figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === 'reset') {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'plainText') {
                    element = document.createElement('p');
                    messageText.appendChild(element);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ol') {
                    element = document.createElement('ol');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.innerText = part.match;
                    li.classList.add('un_li')
                    messageText.appendChild(element);
                    //console.log(part.subItems)
                    //const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeOlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'ul') {
                    element = document.createElement('ul');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.innerText = part.match;
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    //const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeUlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'expl') {
                    element = document.createElement('p');
                    element.className = "plain-text";
                    messageText.appendChild(element);
                    typeExplItems(element, part.subItems, () => {
                        checkNextLink(element);
                    });
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        } else {
            stopLoader();
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeOlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                let linkText = listItem.match;
                if (listItem.type === 'link') {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let olText = listItem.match.replace(/-#([^#]*)-#|-#/, '$1');
                        typeElement(listElement, olText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });

                    }
                }

            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeUlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                //let li = document.createElement('li');
                //listElement.appendChild(li);
                let linkText = listItem.match;
                if (listItem.type === 'link') {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let liText = listItem.match.replace(/-\*([^*]*)-\*|-\*/, '$1');
                        typeElement(listElement, liText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });

                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeExplItems = (explElement, explItems, callback) => {

        let itemIndex = 0;

        const typeNextItem = () => {
            if (explItems && itemIndex < explItems.length) {
                let explItem = explItems[itemIndex];
                let linkText = explItem.match;
                if (explItem.type === 'link') {
                    appendLink(explElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < explItems.length) {
                        let explText = explItem.match.replace(/-\|([^*]*)-\||-\|/, '$1');
                        typeElement(explElement, explText, 0, () => {
                            itemIndex++;
                            typeNextItem();
                        });

                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };


    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            element.innerHTML += content[index];
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            callback();
        }
    };

    const appendLink = (element, link, position) => {
        element.innerHTML += link;
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    const messageTextHtml = `
    <div class="message-text">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        startLoader();
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}


function addMesxsage(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isit", isPersonal);
    const messageDiv = document.createElement("div");

    messageDiv.className =
        "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
<figure class="avatar">
<img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
</figure>`;

    const timestampHtml = `<div>${getCurrentTime()}</div>`;

    const messageTextDiv = document.createElement("p");
    messageTextDiv.className = "text";

    // Check for links in the text and gather their positions
    let parsedResponse = [];
    let regex = /(<a href="[^"]+">[^<]+<\/a>|[^<]+)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        parsedResponse.push(match[0]);
    }

    let charIndex = 0;
    let partIndex = 0;
    const typeResponse = (loaderStarted) => {
        if (!loaderStarted) {
            startLoader(); // Start loader animation if not already started
        }

        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            let part = parsedResponse[partIndex];

            if (part.startsWith("<a")) {
                messageText.innerHTML += part;
                partIndex++;
                charIndex = 0; // Reset charIndex for the next part
            } else {
                if (charIndex < part.length) {
                    messageText.innerHTML += part[charIndex];
                    charIndex++;
                } else {
                    charIndex = 0;
                    partIndex++;
                }
            }

            if (partIndex < parsedResponse.length) {
                typingTimeout = setTimeout(() => typeResponse(true), 20); // Adjust the delay time as needed
            } else {
                stopLoader();
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    };

    const messageTextHtml = `<div class="message-text"><p class="text"></p>
<div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
</div>`;

    messageDiv.innerHTML = isPersonal
        ? messageTextHtml + avatarHtml
        : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = "";
        typeResponse(false);
    } else {
        const messageText = messageDiv.querySelector(".text");
        messageText.innerHTML = text;
    }
}

function convertLinks() {
    // Implementation of convertLinks function
    const links = responseText.querySelectorAll("a");
    links.forEach((link) => {
        const href = link.getAttribute("href");
        link.textContent = href;
    });
}



const responseText = document.getElementById("response-text");

let parsedResponse = [];
let regex = /(<a href="[^"]+">[^<]+<\/a>|[^<]+)/g;
let match;
while ((match = regex.exec(response1)) !== null) {
    parsedResponse.push(match[0]);
}

let charIndex = 0;
let partIndex = 0;
let timer = null;
function typeResponse1() {
    if (partIndex < parsedResponse.length) {
        let part = parsedResponse[partIndex];
        if (part.startsWith("<a")) {
            responseText.innerHTML += part;
            partIndex++;
        } else {
            if (charIndex < part.length) {
                responseText.innerHTML += part[charIndex];
                charIndex++;
            } else {
                charIndex = 0;
                partIndex++;
            }
        }
        timer = setTimeout(typeResponse1, 20); // adjust the speed of the typing animation
        //console.log("Links: " + parsedResponse[3]);
    } else {
        clearTimeout(timer);
        // convertLinks1();
    }
}

function convertLinks1() {
    const links = responseText.querySelectorAll("a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        link.textContent = href;
    });
}

function stopLoader() {
    console.log("assist1", assistDivM);
    // console.log("assist2");
    const panel = document.createElement('span');
    const mt = document.querySelectorAll(".message-text")
    const lastMessage = mt[mt.length - 1];
    const lastTxt = lastMessage.querySelector(".text")
    const lastTt = lastMessage.querySelector(".timestamp")
    const lastAs = lastTt.querySelector(".assist")
    //const lastPl = lastAs.querySelector(".panel")
    console.log(mt.length)
    panel.className = 'panel';
    panel.innerHTML = `
            <span title="Copy">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6" id="copy"> 
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
            </span>
            <span title="regenerate">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" id="regenerate"> 
                    <path fill-rule="evenodd"
                        d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                        clip-rule="evenodd" />
                </svg>
            </span>
            <span title="Like">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6" id="like" title="unlike">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
        </span>
            <span title="Dislike">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6" id="dislike"> 
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
            </svg>
        </span>
        
        `;
    const loadingMessage =
        document.querySelector(".messages .loading");
    //const parent = loadingMessage.parentElement;
    if (loadingMessage) {
        loadingMessage.remove();
        console.log("loader stopped");
    }
    // assistDivM.innerHTML = '';
    if (lastTxt.classList.contains('error')) {
        lastAs.querySelector('.panel').remove();
    } else if (mt.length > 1 && !lastAs.querySelector('.panel')) {
        lastAs.appendChild(panel);
    }

}




panel.querySelector('.copy_btn').addEventListener('click', () => {
    const clone = messageDiv.cloneNode(true)
    const textWithLinks = convertLinks(clone);
    const textToCopy = textWithLinks.querySelector('.text').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log('Text copied...:', textToCopy);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });

});





/* addsamplemesages*/

function addSamplemMessages() {
    var sampleMessages = [
        {
            message: [
                {
                    text: "hello",
                    responses: [
                        'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                    ]
                },
            ]
        },
        {
            message: [
                {
                    text: "hello2",
                    responses: [
                        "Hello there!2",
                        "Hello how can I assist you.2"
                    ]
                },
                {
                    text: "hello3",
                    responses: [
                        "Hello there!3",
                        "Hello how can I assist you3"
                    ]
                }
            ]
        },
        {
            message: [
                {
                    text: "Sample message 2",
                    responses: ["Response 1 to sample message 2", "Response 2 to sample message 2"]
                }
            ]
        },
    ];
    console.log(sampleMessages)
    // Iterate through each message object in sampleMessages
    sampleMessages.forEach(function (messageObj, messageIndex) {
        messageObj.message.forEach(function (textObj, textIndex) {
            // Display the main message
            addMessage("You", textObj.text, true);

            if (textObj.responses.length > 1) {
                // Display the first response with navigation
                addNavigableResponse("MKSU-VA", textObj.responses, false);
            } else {
                // Display the single response without navigation
                addMessages("MKSU-VA", textObj.responses[0], false);
            }
        });
    });

    // Add the sample messages to the global messages array
    messages.push(...sampleMessages);
}

function addNavigableResponse(sender, responses, isPersonal) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
    </figure>`;

    const messageTextHtml = `
    <div class="message-text">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p>${getCurrentTime()}</p></div>
    </div>`;
    const messagesSpan = document.createElement('div')
    messagesSpan.classList.add('flexx');
    messageDiv.innerHTML = avatarHtml + messageTextHtml;
    //messageDiv.classList.add('border');

    const textDiv = messageDiv.querySelector(".text");
    const responseDiv = document.createElement("div");
    responseDiv.className = "response";
    responseDiv.innerHTML = responses[0];

    textDiv.appendChild(responseDiv);

    if (responses.length > 1) {
        const navigationDiv = document.createElement("div");
        navigationDiv.className = "navigation";

        var prevButton = document.createElement("button");
        prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>';
        prevButton.className = "nav-button left";
        prevButton.disabled = true; // Initially disabled

        var nextButton = document.createElement("button");
        nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>';
        nextButton.className = "nav-button right";

        const infoText = document.createElement("span");
        infoText.className = "nav-info";
        infoText.innerHTML = `<p class="nav-info">1 of ${responses.length}</p>`;//infoText.textContent = `Response 1 of ${responses.length}, Text 1 of ${messages[messageIndex].message.length}`;

        navigationDiv.appendChild(prevButton);
        navigationDiv.appendChild(infoText);
        navigationDiv.appendChild(nextButton);

        //textDiv.appendChild(navigationDiv);
        messagesSpan.insertAdjacentElement('afterbegin', navigationDiv)

        let currentResponseIndex = 0;

        prevButton.addEventListener("click", () => {
            if (currentResponseIndex > 0) {
                currentResponseIndex--;
                responseDiv.innerHTML = responses[currentResponseIndex];
                infoText.textContent = `Response ${currentResponseIndex + 1} of ${responses.length}`;
                nextButton.disabled = false;
                if (currentResponseIndex === 0) {
                    prevButton.disabled = true;
                }
            }
        });

        nextButton.addEventListener("click", () => {
            if (currentResponseIndex < responses.length - 1) {
                currentResponseIndex++;
                responseDiv.innerHTML = responses[currentResponseIndex];
                infoText.textContent = `Response ${currentResponseIndex + 1} of ${responses.length}`;
                prevButton.disabled = false;
                if (currentResponseIndex === responses.length - 1) {
                    nextButton.disabled = true;
                }
            }
        });
    }
    messagesSpan.appendChild(messageDiv)
    messagesContainer.appendChild(messagesSpan);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessages(sender, text, isPersonal) {
    console.log("sender", sender);
    console.log("text", text);
    console.log("isPersonal", isPersonal);

    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
<figure class="avatar">
<img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
</figure>`;

    const timestampHtml = `<div class="timestamp"><span class="assist"><p>${sender}</p></span><p class="time">${getCurrentTime()}</p></div>`;
    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    const messageText = document.createElement('div');
    messageText.className = 'text';
    parsedResponse.forEach(part => {
        let element;

        if (part.type === 'link') {
            appendLink(messageText, part.match);
        } else if (part.type === 'reset') {
            // Skip reset
        } else if (part.type === 'plainText') {
            element = document.createElement('span');
            element.innerHTML = part.match;
            messageText.appendChild(element);
        } else if (part.type === 'header') {
            element = document.createElement('h3');
            const headerText = part.match.replace(/###([^#]+)###/, '$1');
            element.innerHTML = headerText;
            messageText.appendChild(element);
        } else if (part.type === 'subheader') {
            element = document.createElement('h4');
            const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
            element.innerHTML = subHeaderText;
            messageText.appendChild(element);
        } else if (part.type === 'ol') {
            element = document.createElement('ol');
            const li = document.createElement('li');
            element.appendChild(li);
            li.classList.add('un_li');
            const olText = part.match.replace(/-#([^#]*)-#/, '$1');
            li.innerHTML = olText;
            messageText.appendChild(element);
        } else if (part.type === 'ul') {
            element = document.createElement('ul');
            const li = document.createElement('li');
            element.appendChild(li);
            const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
            li.innerHTML = ulText;
            messageText.appendChild(element);
        }
    });

    const editButtonHtml = isPersonal ? `<button class="edit-button">Edit</button>` : '';


    const messageTextHtml = `
<div class="message-text">
${messageText.outerHTML}
${editButtonHtml}
${timestampHtml}
</div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    const assistDiv = messageDiv.querySelector(".assist");
    const panel = document.createElement('span');
    const mt = document.querySelectorAll(".message-text")
    const lastMessage = mt[mt.length - 1];
    const lastTxt = lastMessage.querySelector(".text")
    const lastTt = lastMessage.querySelector(".timestamp")
    const lastAs = lastTt.querySelector(".assist")
    //const lastPl = lastAs.querySelector(".panel")
    console.log(mt.length)
    panel.style.display = 'none'
    panel.className = 'panel';
    panel.innerHTML = `
                    <button title="Speak" class="ssu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                    </button>
                    <button title="Copy" class="copy_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6"> 
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                    </button>
                    <button title="Regenerate" class="regenerate"">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                    </button>
                    <button title="Like" class="like">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                </button>
                    <button title="Dislike" class="dislike">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6"> 
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                    </svg>
                </button>
                
                `;
    assistDiv.appendChild(panel);
    // assistDivM.innerHTML = '';

    // console.log("assist1", (parent.parentElement.parentElement));
    messageDiv.addEventListener('focus', () => {
        panel.style.display = 'flex';
        messageDiv.classList.add('focused');
    });

    // Add event listeners for mouse enter and leave
    messageDiv.addEventListener('mouseenter', () => {
        panel.style.display = 'flex';
        messageDiv.classList.add('focused');
    });

    messageDiv.addEventListener('blur', () => {
        setTimeout(() => {
            panel.style.display = 'none';
            messageDiv.classList.remove('focused');
        }, 50);
    });

    messageDiv.addEventListener('mouseleave', () => {
        if (!messageDiv.contains(document.activeElement)) {
            panel.style.display = 'none';
            messageDiv.classList.remove('focused');
        }
    });
    panel.querySelector('.ssu').addEventListener('click', () => {
        var text = messageDiv.querySelector('.text').innerText;
        convertTextToSpeech(text)
    });
    function convertTextToSpeech(text) {
        // Get the text from the textarea
        //var text = document.getElementById("text").value;

        // Create a new SpeechSynthesisUtterance object
        var speech = new SpeechSynthesisUtterance();

        // Set the text that will be spoken
        speech.text = text;

        // Set additional properties if needed (optional)
        speech.lang = 'en-US';  // Set the language
        speech.volume = 1;      // Set the volume (0 to 1)
        speech.rate = 1.2;        // Set the rate (0.1 to 10)
        speech.pitch = 1;       // Set the pitch (0 to 2)

        // Speak the text
        window.speechSynthesis.speak(speech);
    }
    panel.querySelector('.copy_btn').addEventListener('click', () => {
        const clone = messageDiv.cloneNode(true)
        // const textWithLinks = convertLinks(clone);
        const textWithLinks = convertLinks(messageDiv);
        const textToCopy = textWithLinks.querySelector('.text').innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Text copied...:', textToCopy);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });

    });

    panel.querySelector('.regenerate').addEventListener('click', (event) => {
        console.log("Regenerating");

        // Find the event source element
        const sourceElement = event.currentTarget.closest('.message');

        // Find the container element of the messages
        const messagesContainer = sourceElement.closest('.messages');

        // Get all .message elements in the container
        const allMessages = Array.from(messagesContainer.querySelectorAll('.message'));

        // Find the index of the source element in the allMessages array
        const sourceIndex = allMessages.indexOf(sourceElement);

        // Remove the .message-personal element immediately above the source
        let innerTxt = '';
        if (sourceIndex > 0) {
            const personalAboveElement = allMessages[sourceIndex - 1];
            if (personalAboveElement.classList.contains('message-personal')) {
                innerTxt = personalAboveElement.querySelector('.text').innerText;
                personalAboveElement.remove();
            }
        }

        // Remove the source element
        sourceElement.remove();

        // Remove all .message and .message-personal elements after the source element
        for (let i = sourceIndex; i < allMessages.length; i++) {
            allMessages[i].remove();
        }

        // Reset the input value and call sendMessage
        messageInput.value = innerTxt;
        sendMessage();
        suggestions.innerHTML = ""; // Remove other suggestions
        addSuggestions();
    });

    panel.querySelector('.like').addEventListener('click', () => {
        console.log("Liking");
    });
    panel.querySelector('.dislike').addEventListener('click', () => {
        console.log("disLiking");
    });

}

const appendLink = (element, link) => {
    element.innerHTML += link;
};

/********/

function addMessage(sender, text, isPersonal) {
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"}" alt="${sender}">
    </figure>`;

    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;
    autoScroll = true;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === 'reset') {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'plainText') {
                    element = document.createElement('span');
                    element.className = 's_p';
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'ol') {
                    element = document.createElement('ol');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.innerText = part.match;
                    li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //console.log(part.subItems)
                    //const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeOlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === 'ul') {
                    element = document.createElement('ul');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.innerText = part.match;
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeUlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === 'expl') {
                    element = document.createElement('p');
                    element.className = "plain-text";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeExplItems(element, part.subItems, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            stopLoader(messageDiv);
            // convertLinks(messageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeOlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                let linkText = listItem.match;
                if (listItem.type === 'link') {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let olText = listItem.match.replace(/-#([^#]*)-#|-#/, '$1');
                        typeElement(listElement, olText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }

            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeUlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                //let li = document.createElement('li');
                //listElement.appendChild(li);
                let linkText = listItem.match;
                if (listItem.type === 'link') {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let liText = listItem.match.replace(/-\*([^*]*)-\*|-\*/, '$1');
                        typeElement(listElement, liText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeExplItems = (explElement, explItems, callback) => {

        let itemIndex = 0;

        const typeNextItem = () => {
            if (explItems && itemIndex < explItems.length) {
                let explItem = explItems[itemIndex];
                let linkText = explItem.match;
                if (explItem.type === 'link') {
                    appendLink(explElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < explItems.length) {
                        let explText = explItem.match.replace(/-\|([^*]*)-\||-\|/, '$1');
                        typeElement(explElement, explText, 0, () => {
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };


    const typeElement = (element, content, index, callback) => {
        const span = document.createElement('span');
        if (!element.querySelector('span')) {
            span.appendChild(cursorSpan);
            element.appendChild(span);
        }
        if (index < content.length) {
            // element.innerHTML += content[index];
            cursorSpan.insertAdjacentText("beforebegin", content[index]);
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            cursorSpan.remove();
            callback();
        }
        // Automatically scroll to the bottom if autoScroll is true
        if (autoScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const appendLink = (element, link, position) => {
        element.innerHTML += link;
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    // const convertLinks = (responseText) => {
    //     const links = responseText.querySelectorAll("a");
    //     links.forEach((link) => {
    //         const href = link.getAttribute("href");
    //         link.textContent = href;
    //     });
    // }
    const messageTextHtml1 = ` ${isPersonal ? `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p class="time">${getCurrentTime()}</p></div>
    </div>
    ` : `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><span class="assist">
        <p>${sender}</p>
        <span class="panel">
            <button>A</button>
            <button>B</button>
            <button>S</button>
        </span>
    </span>
    <p class="time">${getCurrentTime()}</p>    </div>
    ` }`;
    const messageTextHtml = `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><span class="assist"><p>${sender}</p></span><p class="time">${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        const assistDiv = messageDiv.querySelector(".assist");
        let parent = assistDivM;
        assistDivM = assistDiv;
        messageText.innerHTML = "";
        startLoader();
        typeResponse();

    } else {
        const messageText = messageDiv.querySelector(".text");
        const as = messageDiv.querySelector(".assist");
        const edit = document.createElement('span');
        const messageTxt = messageText.parentElement.parentElement;
        messageText.innerHTML = text;
        edit.style.display = 'none'
        edit.className = 'panel';
        edit.innerHTML = `
            <button title="Edit" class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </button>
            
            `;
        //<button class="send">Send</button>
        as.appendChild(edit);
        messageTxt.addEventListener('focus', () => {
            edit.style.display = 'flex';
            messageTxt.classList.add('focused');
        });

        // Add event listeners for mouse enter and leave
        messageTxt.addEventListener('mouseenter', () => {
            edit.style.display = 'flex';
            messageTxt.classList.add('focused');
        });

        messageTxt.addEventListener('blur', () => {
            setTimeout(() => {
                edit.style.display = 'none';
                editBtn.style.display = 'none';
                messageText.contentEditable = false;
                messageTxt.classList.remove('focused');
            }, 50);
        });

        messageTxt.addEventListener('mouseleave', () => {
            if (!messageTxt.contains(document.activeElement)) {
                edit.style.display = 'none';
                messageTxt.classList.remove('focused');
            }
        });
        edit.addEventListener('click', () => {
            messageText.contentEditable = true;
            messageText.focus();
            edit.style.display = 'none';
            const mt = as.closest('.message-text');
            if (!messageDiv.querySelector('.editBtns')) {
                mt.insertAdjacentHTML(
                    'afterend',
                    `<span class="editBtns">
                    <button class="cancelBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="var(--text-color)" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button class="sendBtn" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                    </button>
                    </span>`
                );

            } else {
                messageDiv.querySelector('.editBtns').style.display = 'flex';
            }
            const cancelBtn = messageDiv.querySelector('.cancelBtn');
            const sendBtn = messageDiv.querySelector('.sendBtn');

            sendBtn.addEventListener('click', (event) => {
                const sourceElement = event.currentTarget.closest('.message');
                const allMessages = Array.from(messagesContainer.querySelectorAll('.message'));
                const sourceIndex = allMessages.indexOf(sourceElement);
                let message_text = messageText.innerText.trim();
                if (!generating) {
                    messageInput.value = message_text;
                    sourceElement.remove();
                    for (let i = sourceIndex; i < allMessages.length; i++) {
                        allMessages[i].remove();
                    }
                    console.log("Sending...", message_text);
                    sendMessage();
                } else {
                    kk.style.color = '#e55865'
                    kk.innerText = 'Please wait for the current generation to end...'
                    setTimeout(() => {
                        kk.style.color = 'var(--text-color)'
                        kk.innerText = "Suggested Prompts:";
                    }, 2000)
                    return;
                }
            });

            cancelBtn.addEventListener('click', () => {
                cancelBtn.closest('.editBtns').remove();
                messageText.innerHTML = text;
                messageText.contentEditable = false;
                console.log('cancelling');
                edit.style.display = 'none';
            });
        });
    }
}


const messageText = messageDiv.querySelector(".text");
function typeElements() {
    let partIndex = 0;
    let charIndex = 0;
    autoScroll = true;
    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const part = parsedResponse[partIndex];

            if (part.type === 'link') {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === 'reset') {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === 'plainText') {
                    element = document.createElement('span');
                    element.className = 's_p';
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'header') {
                    element = document.createElement('h3');
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const headerText = part.match.replace(/###([^#]+)###/, '$1');
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'subheader') {
                    element = document.createElement('h4');
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const subHeaderText = part.match.replace(/\*\*\*([^*]+)\*\*\*/, '$1');
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === 'ol') {
                    element = document.createElement('ol');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.innerText = part.match;
                    li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //console.log(part.subItems)
                    //const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeOlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === 'ul') {
                    element = document.createElement('ul');
                    const li = document.createElement('li');
                    element.appendChild(li);
                    li.innerText = part.match;
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeUlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === 'expl') {
                    element = document.createElement('p');
                    element.className = "plain-text";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeExplItems(element, part.subItems, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            stopLoader(messageDiv);
            // convertLinks(messageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeOlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                let linkText = listItem.match;
                if (listItem.type === 'link') {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let olText = listItem.match.replace(/-#([^#]*)-#|-#/, '$1');
                        typeElement(listElement, olText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }

            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeUlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                //let li = document.createElement('li');
                //listElement.appendChild(li);
                let linkText = listItem.match;
                if (listItem.type === 'link') {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let liText = listItem.match.replace(/-\*([^*]*)-\*|-\*/, '$1');
                        typeElement(listElement, liText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeExplItems = (explElement, explItems, callback) => {

        let itemIndex = 0;

        const typeNextItem = () => {
            if (explItems && itemIndex < explItems.length) {
                let explItem = explItems[itemIndex];
                let linkText = explItem.match;
                if (explItem.type === 'link') {
                    appendLink(explElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < explItems.length) {
                        let explText = explItem.match.replace(/-\|([^*]*)-\||-\|/, '$1');
                        typeElement(explElement, explText, 0, () => {
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };


    const typeElement = (element, content, index, callback) => {
        const span = document.createElement('span');
        if (!element.querySelector('span')) {
            span.appendChild(cursorSpan);
            element.appendChild(span);
        }
        if (index < content.length) {
            // element.innerHTML += content[index];
            cursorSpan.insertAdjacentText("beforebegin", content[index]);
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            cursorSpan.remove();
            callback();
        }
        // Automatically scroll to the bottom if autoScroll is true
        if (autoScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const appendLink = (element, link, position) => {
        element.innerHTML += link;
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (partIndex < parsedResponse.length && parsedResponse[partIndex].type === 'link') {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

}

function typeElements(animate){}


function sendMessage() {
    const messageText = messageInput.value.trim();
    userText = messageText;
    let response = ''
    let fetchedSug = []
    if (!state) {
        kk.innerText = 'Assistant disabled by user settings!';
    } else {
        if (!generating) {
            if (messageText !== "") {
                currentTextIndex = 0;
                let messageObject = {
                    message: [
                        {
                            text: `${messageText}`,
                            responses: []
                        }
                    ]
                };

                //addMessage("You", messageText, true); // Add user's message to UI
                addNavigableResponse("You", messageObject.message[currentTextIndex].text, true, messageObject, null, null);
                messagesContainer.scrollTop =
                    messagesContainer.scrollHeight;

                const prompt = { "prompt": messageText };
                fetch("/getResponses", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(prompt)
                })
                    .then((data) => {
                        suggestionClass.innerHTML = "";
                        if (kk.classList.contains("error")) {
                            kk.classList.remove("error");
                        }
                        return data.json();
                    })
                    .then((data) => {
                        console.log("REsponse", data)
                        response = data["response"]; //const responseText = data.response;
                        messageObject.message[0].responses.push(response)
                        messages.push(messageObject)
                        console.log('messageObject', messages)
                        fetchedSug = data["suggestions"]; // const suggestions = data.suggestions;
                        // Update suggestions
                        suggestionClass.innerHTML = "";
                        addSuggestions(fetchedSug);

                        // Clear the input field
                        messageInput.value = "";
                        //addNavigableResponse("MKSU-VA", messageObject.message[currentTextIndex].responses, false, messageObject, null, true);

                    })
                    .catch((error) => {
                        const mt = document.querySelectorAll(".message-text")
                        const lastMessage = mt[mt.length - 1];
                        const lastText = lastMessage.querySelector(".text")
                        console.log("Error fetching response!!", error);
                        suggestionClass.innerHTML = '';
                        lastText.innerText = "An error occurred  while generating response!!  Please check your connection and tap to retry. If this persists please contact the administrator...";
                        kk.innerText = "Error fetching suggestions!!";
                        lastText.classList.add('error');
                        kk.classList.add('error');
                        console.log("Error fetching suggestions!!", error);
                        lastText.addEventListener('click', function (e) {
                            // resetPwd()
                            messageInput.value = userText;
                            sendMessage()
                        });
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                        stopLoader();
                    })
                setTimeout(function () {
                    generating = true;
                    // addMessage(
                    //    "MksU-VA",//"Assistant",
                    //    response,
                    //    false
                    // ); // Add bot's response to UI
                    animateText = true;
                    addNavigableResponse("MKSU-VA", messageObject.message[currentTextIndex].responses, false, messageObject, null, true);
                }, 500);
                messageInput.value = ""; // Clear input field after sending message
                //messageInput.focus();
            } else {
                kk.innerText = 'Please enter something first...';
                kk.style.color = '#e55865'
                //messageInput.setAttribute('placeHolder', 'Please enter something first...');
                setTimeout(() => {
                    kk.style.color = 'var(--text-color)'
                    kk.innerText = "Suggested Prompts:";
                }, 2000)
                return;
            }
        } else {
            kk.innerText = 'Please wait for the current generation to end...'
            kk.style.color = '#e55865'
            setTimeout(() => {
                kk.style.color = 'var(--text-color)'
                kk.innerText = "Suggested Prompts:";
            }, 2000)
            return;
        }
    }
    if (defaultText) {
        defaultText.style.display = 'none';
    }
}