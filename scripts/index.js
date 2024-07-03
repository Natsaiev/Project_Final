import {
    eventsList,
    selectTypeEvent,
    selectDistanceEvent,
    selectCategoryEvent,
    eventsFiltersContainer,
    selectedFilters,
    eventsStore,

} from "./data.js";
import {formatDate} from "./utils.js";

handleSelectMenu(selectTypeEvent);
handleSelectMenu(selectDistanceEvent);
handleSelectMenu(selectCategoryEvent);
createCards(eventsStore);



/*===============================CREATE_CARDS==============================*/
function createCards(objArray) {
    eventsList.textContent = "";
    objArray.forEach((eventObj) => {
        createCard(eventObj);
    })
}

function createCard(obj) {
    const eventHr = document.createElement("hr");
    const eventContainer = document.createElement("div");

    const eventImageContainer = document.createElement("div");
    const eventImage = document.createElement("img");
    const eventBadge = document.createElement("div");
    const eventBadgeType = document.createElement("p");

    const eventInfoContainer = document.createElement("div");
    const eventDateInfoPar = document.createElement("p");
    const eventTitleHeader = document.createElement("h4");
    const eventLocationInfo = document.createElement("p");
    const eventType = document.createElement("p");
    const eventAttendees = document.createElement("p");

    eventHr.classList.add("border");

    eventImageContainer.classList.add("eventImageContainer");
    eventImage.classList.add("eventImage");
    eventBadge.classList.add("eventBadge");
    eventBadgeType.classList.add("eventBadgeType");

    eventContainer.classList.add("eventContainer");
    eventContainer.classList.add("eventContainerMobil");
    eventInfoContainer.classList.add("eventInfoContainer");
    eventDateInfoPar.classList.add("eventDateInfo",);
    eventTitleHeader.classList.add("eventTitleHeader",);
    eventLocationInfo.classList.add("eventLocationInfo");
    eventType.classList.add("eventType");
    eventAttendees.classList.add("eventAttendees");
    eventDateInfoPar.textContent = formatDate(obj.date);
    eventTitleHeader.textContent = obj.title;
    eventLocationInfo.textContent = obj.category;
    if (obj.attendees) {
        eventAttendees.textContent = obj.attendees;
    }
    eventImage.setAttribute("src", `${obj.image}`);
    eventInfoContainer.append(eventDateInfoPar, eventTitleHeader, eventLocationInfo);
    if (eventAttendees.textContent !== "") {
        eventInfoContainer.append(eventAttendees);
    }
    eventImageContainer.append(eventImage);
    if (obj.type === "online") {
        eventType.textContent = "Online";
        eventBadgeType.textContent = "Online Event";
        eventBadge.setAttribute("display", "block");
        eventBadge.append(eventBadgeType);
        eventImageContainer.append(eventBadge);
        eventInfoContainer.append(eventType);
    }

    eventContainer.append(eventImageContainer, eventInfoContainer);
    eventsList.append(eventHr, eventContainer);
}

// console.log(selectedFilters);
function handleSelectMenu(selectMenu) {
    const selectTypeEventTitle = selectMenu.querySelector(".select_menu_event_list");
    const selectTypeEventLabels = selectMenu.querySelectorAll(".input_label");
    selectTypeEventTitle.addEventListener('click', () => {
        if ('active' === selectMenu.getAttribute('data-state')) {
            selectMenu.setAttribute('data-state', '');
            eventsFiltersContainer.style.paddingBottom = `10px`;
        } else {
            selectMenu.setAttribute('data-state', 'active');
            eventsFiltersContainer.style.paddingBottom = `${selectTypeEventLabels.length * 40}px`;
        }
    });

    document.addEventListener('click', (event) => {
        if (!selectMenu.contains(event.target)) {
            selectMenu.setAttribute('data-state', '');
            eventsFiltersContainer.style.paddingBottom = `10px`;
        }
    });

    selectTypeEventLabels.forEach(label => {
        label.addEventListener('click', (evt) => {
            if (evt.target.closest("#typeEventMenu")) {
                selectedFilters.typeEvent = evt.target.textContent;
                filterEvents("type", eventsStore, selectedFilters);
            } else if (evt.target.closest("#distanceEventMenu")) {
                selectedFilters.distanceEvent = evt.target.textContent !== "Any distance" ? +evt.target.textContent.split("km")[0] : "Any distance";
                filterEvents("distance", eventsStore, selectedFilters);
            } else if (evt.target.closest("#selectCategoryEvent")) {
                selectedFilters.categoryEvent = evt.target.textContent;
                filterEvents("category", eventsStore, selectedFilters);
            }
            selectTypeEventTitle.textContent = evt.target.textContent;
            selectMenu.setAttribute('data-state', '');
            eventsFiltersContainer.style.paddingBottom = `10px`;
        });
    });
}

function filterEvents(type, array, filtersObj) {
    // console.log(array);
    let newArray = [];

    switch (type) {
        case "type":
            if (filtersObj.typeEvent !== "Any type") {
                newArray = array.filter((el) => {
                    return el.type === filtersObj.typeEvent.toLowerCase();
                });
            } else {
                newArray = array.slice();
            }
            break;
        case "distance":
            if (filtersObj.distanceEvent !== "Any distance") {
                newArray = array.filter((el) => {
                    return el.distance === filtersObj.distanceEvent;
                });
            } else {
                newArray = array.slice();
            }

            break;
        case "category":
            if (filtersObj.categoryEvent !== "Any category") {
                newArray = array.filter((el) => {
                    return el.category === filtersObj.categoryEvent;
                });
            } else {
                newArray = array.slice();
            }
            break;
    }

    // console.log("Filtred array: ", newArray);
    createCards(newArray);
}



