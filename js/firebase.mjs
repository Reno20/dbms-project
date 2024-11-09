import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
    collection, addDoc, getDocs, query, where, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcnbrIJpJRy8YBzPpcGzna4ESOpS_AcSU",
    authDomain: "ams2024-14c45.firebaseapp.com",
    projectId: "ams2024-14c45",
    storageBucket: "ams2024-14c45.firebasestorage.app",
    messagingSenderId: "36219047437",
    appId: "1:36219047437:web:0826a33501a6cf1d758f44",
    measurementId: "G-T6LRP7VGP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

console.log("Firebase initialized");

const eventsCollection = collection(db, "events");
const itemsCollection = collection(db, "items");

function showSection(sectionId) {
    const sections = document.querySelectorAll('.admin-section, .user-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Function to add a new auction event
async function addEvent() {
    console.log("addEvent function called");  // Debugging print
    const eventTitle = document.getElementById("eventTitle").value.trim();
    const eventDate = document.getElementById("eventDate").value;
    const eventDescription = document.getElementById("eventDescription").value.trim();
    const eventLocation = document.getElementById("eventLocation").value.trim();

    if (!eventTitle || !eventDate || !eventDescription || !eventLocation) {
        alert("Please fill in all event fields.");
        return;
    }

    try {
        await addDoc(eventsCollection, {
            title: eventTitle,
            date: eventDate,
            description: eventDescription,
            location: eventLocation
        });
        alert("Event added successfully.");
        document.getElementById("eventForm").reset();
        loadEventsForDropdown();
    } catch (error) {
        console.error("Error adding event: ", error);
    }
}

// Function to add a new auction item linked to a specific event
async function addItem() {
    console.log("addItem function called");  // Debugging print
    const itemName = document.getElementById("itemName").value.trim();
    const itemOrigin = document.getElementById("itemOrigin").value.trim();
    const itemYear = parseInt(document.getElementById("itemYear").value);
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const itemAuthor = document.getElementById("itemAuthor").value.trim();
    const itemDescription = document.getElementById("itemDescription").value.trim();
    const eventId = document.getElementById("eventSelect").value;

    if (!itemName || !itemOrigin || isNaN(itemYear) || isNaN(itemPrice) || !itemAuthor || !itemDescription || !eventId) {
        alert("Please fill in all item fields.");
        return;
    }

    try {
        await addDoc(itemsCollection, {
            name: itemName,
            origin: itemOrigin,
            year: itemYear,
            price: itemPrice,
            author: itemAuthor,
            description: itemDescription,
            eventId: eventId
        });
        alert("Item added successfully.");
        document.getElementById("itemForm").reset();
    } catch (error) {
        console.error("Error adding item: ", error);
    }
}

// Function to load events into a dropdown for item addition
async function loadEventsForDropdown() {
    const eventSelect = document.getElementById("eventSelect");
    if (eventSelect) {
        eventSelect.innerHTML = ""; // Clear previous options

        try {
            const querySnapshot = await getDocs(eventsCollection);
            querySnapshot.forEach((doc) => {
                const event = doc.data();
                const option = document.createElement("option");
                option.value = doc.id;
                option.textContent = `${event.title} (${event.date})`;
                eventSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading events: ", error);
        }
    }
}

// Function to load and display events in different sections (present, past, upcoming)
async function displayEvents() {
    const presentEventsList = document.getElementById("presentEventsList");
    const pastEventsList = document.getElementById("pastEventsList");
    const upcomingEventsList = document.getElementById("upcomingEventsList");

    if (presentEventsList && pastEventsList && upcomingEventsList) {
        presentEventsList.innerHTML = "";
        pastEventsList.innerHTML = "";
        upcomingEventsList.innerHTML = "";

        try {
            const querySnapshot = await getDocs(eventsCollection);
            const today = new Date().toISOString().split("T")[0];

            querySnapshot.forEach((doc) => {
                const event = doc.data();
                const eventDate = event.date;
                const eventId = doc.id; // Get the event ID 
                const eventElement = document.createElement("a"); 
                eventElement.href = `items.html?eventId=${eventId}`; 
                eventElement.className = "event-button";
                eventElement.textContent = `${event.title} - ${eventDate}: ${event.description}, Location: ${event.location}`;

                if (eventDate === today) {
                    presentEventsList.appendChild(eventElement);
                } else if (eventDate < today) {
                    pastEventsList.appendChild(eventElement);
                } else {
                    upcomingEventsList.appendChild(eventElement);
                }
            });
        } catch (error) {
            console.error("Error displaying events: ", error);
        }
    }
}

// Function to filter and display items for a selected event
async function displayItemsByEvent(eventId) {
    const itemsList = document.getElementById("items");
    if (itemsList) {
        itemsList.innerHTML = "";

        try {
            const q = query(itemsCollection, where("eventId", "==", eventId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                itemsList.textContent = "No items found for this event.";
                return;
            }

            querySnapshot.forEach((doc) => {
                const item = doc.data();
                const itemElement = document.createElement("div");
                itemElement.textContent = `${item.name} - ${item.origin} (${item.year}), Highest Price: ${item.price}, Author: ${item.author}, Description: ${item.description}`;
                itemsList.appendChild(itemElement);
            });
        } catch (error) {
            console.error("Error displaying items: ", error);
        }
    }
}

// Initialize data on page load
window.onload = function () {
    console.log("window.onload called");  // Debugging print
    displayEvents();
    loadEventsForDropdown();
};

export { showSection, addEvent, addItem, loadEventsForDropdown, displayEvents, displayItemsByEvent };