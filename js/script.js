
import { showSection, addEvent, addItem, loadEventsForDropdown, displayEvents } from './firebase.mjs';

// Make functions globally accessible for HTML `onclick` events
window.showSection = showSection;
window.addEvent = addEvent;
window.addItem = addItem;

// Initialize data on page load
window.onload = function () {
    displayEvents();
    loadEventsForDropdown();
};
