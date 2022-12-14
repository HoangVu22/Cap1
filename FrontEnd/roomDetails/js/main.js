/*
*main.js
*
*v3.1
*
*11/28/2022
*
*Nguyen Hoang Vu, Huynh Van Tien Phong
*/


const hotelId = JSON.parse(localStorage.getItem("targetHotelId"));
const reviewButton = document.querySelector("button.btn-cmt");

// ---------header------------
var header = document.querySelector("header");
var header_logo = document.querySelector(".header-logo h1");
var headerNavIcon = document.querySelector(".header-nav-icon");
window.onscroll = function () {
    myFunction();
};

// ---------- hotel's images -------------
const imageHotelContainer = document.querySelector(".detail-room.wraper2");
function fetchImagesOfHotel () {
    fetch("http://localhost:1234/api/v1/images/images_of_hotel/" + hotelId)
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 200) {
                if (data.data.length === 0) {
                    imageHotelContainer.remove();
                }
                data.data.forEach((image, index) => {
                    const html = `<img data-id="${image.imageId}" src="${image.url}" class="detail-room-img" alt="">`;
                    if (index === 0) {
                        imageHotelContainer.querySelector(".detail-room-left").innerHTML =
                            html;
                    }
                    if (index === 1 || index === 2 || index === 3) {
                        imageHotelContainer.querySelector(
                            ".detail-room-right .detail-room-right-top"
                        ).innerHTML += html;
                    }
                    if (index === 4 || index === 5 || index === 6) {
                        imageHotelContainer.querySelector(
                            ".detail-room-right .detail-room-right-bottom"
                        ).innerHTML += html;
                    }
                });
                Detailroom();
            }
        });
}
fetchImagesOfHotel();

function modalRoom (roomNumber, arrimg, services) {
    return `<div class="show-detail-room" style="display: flex;">
    <div class="detail-image-room">
        <div class="image-room-main">
            <img class="showing-image img-feature" src=${arrimg[0]?.url}>
            <div class="img-control prev-control">
                <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div class="img-control next-control">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
        <div class="list-image">
            ${arrimg
            .map((e) => {
                return `<div><img src=${e.url} alt=""></div>`;
            })
            .join("")}
        </div>
    </div>
    <div class="detail-content-room">
        <h1>${roomNumber}</h1>
        <div class="convenient">
            ${[...services]
            .map((service) => {
                return `<div class="room-type">
                            <i class="${service.children[0].className}"></i>
                            <span>${service.children[1].textContent}</span>
                        </div>`;
            })
            .join("")}
        </div>
        <div class="convenient-room">
            <h1>Ti???n nghi ph??ng</h1>
            <ul>
                <li>??i???u h??a kh??ng kh??</li>
                <li>H??? th???ng c??ch ??m</li>
                <li>Tivi</li>
                <li>T??? l???nh</li>
                <li>T??? qu???n ??o</li>
                <li>B??n ??n</li>
                <li>More...</li>
            </ul>
        </div>
        <div class="reserve">
            <button>Thanh to??n</button>
        </div>
    </div>
    <div class="room-close">
        <i class="fa-solid fa-xmark"></i>
    </div>

    <div class="detail-content">
        <div class="choose-payment">
            <p>L???a ch???n thanh to??n c???a qu?? kh??ch</p>
            <p class="question-payment">Qu?? v??? c?? th??? thu ti???n qua th??? t??n d???ng t???i ch??? ngh??? kh??ng?</p> 
            <div class="radio-block-1">
                <div class="radio-yes">
                    <input id="yes" name="radio" class="radio-input" type="radio">
                    <label for="yes">C??</label>
                </div>
                <div class="radio-no">
                    <input id="no" name="radio" class="radio-input" type="radio">
                    <label for="no">Kh??ng</label>
                </div>
            </div>
            <div class="creditcard-section">
                <div class="creditcard-left">
                    <div class="creditcard-item">
                        <input id="momo" type="radio" name="radio">
                        <img src="../image/creditcard/momo.png" alt="">
                        <label for="momo">MoMo</label>
                    </div>
                    <div class="creditcard-item">
                        <input id="paypal" type="radio" name="radio">
                        <img src="../image/creditcard/payPal.png" alt="">
                        <label for="paypal">PayPal</label>
                    </div>
                    <div class="creditcard-item">
                        <input id="zaloPay" type="radio" name="radio">
                        <img src="../image/creditcard/ZaloPay.png" alt="">
                        <label for="zaloPay">ZaloPay</label>
                    </div>
                </div>
                <div class="creditcard-right">
                    <div class="creditcard-item">
                        <input id="agribank" type="radio" name="radio">
                        <img src="../image/creditcard/agribank.png" alt="">
                        <label for="agribank">Agribank</label>
                    </div>
                    <div class="creditcard-item">
                        <input id="vietcombank" type="radio" name="radio">
                        <img src="../image/creditcard/Vietcombank.jpg" alt="">
                        <label for="vietcombank">Vietcombank</label>
                    </div>
                    <div class="creditcard-item">
                        <input id="techcombank" type="radio" name="radio">
                        <img src="../image/creditcard/Techcombank.png" alt="">
                        <label for="techcombank">Techcombank</label>
                    </div>
                </div>
            </div>
            <div class="cash-section">
                <p>Ch??ng t??i s??? th??ng b??o v???i kh??ch r???ng Qu?? v??? ch??? ch???p nh???n thanh to??n b???ng ti???n m???t.</p>
            </div>

            <div class="reserve reserve1">
                <button>?????t ngay</button>
            </div>
            <div class="payclose">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
    </div>
</div>`;
}
const rooms = JSON.parse(localStorage.getItem("rooms"));
const room = rooms.map((value) => {
    return ` <tr class="list-residence">
                        <td class="list-content list-status">
                            <b class="name-room" data-idroom=${value.roomId
        }>Ph??ng ${value.roomNumber}</b>
                            <div class="convenient">
                            ${value.services.length > 0 &&
        value.services
            .map((e) => {
                return `<div class="room-type">
                                <i class="${e.serviceName === "Wifi"
                        ? "fa-solid fa-wifi"
                        : e.serviceName === "H??? th???ng c??ch ??m"
                            ? "fa-solid fa-ear-deaf"
                            : e.serviceName === "??i???u h??a kh??ng kh??"
                                ? "fa-regular fa-snowflake"
                                : "fa-solid fa-bed"
                    }"></i>
                                <span>${e.serviceName}</span>
                            </div>`;
            })
            .join("")
        }
                            </div>
                        </td>
                        <td class="list-content list-people">
                            <span>${value.adultNumber + value.kidNumber
        } ng?????i</span>
                        </td>
                        <td class="list-content list-info">
                            <span>${value.price} VN??</span>
                        </td>
                        <td class="list-content list-id">
                            <button data-idroom = ${value.roomId
        } class="booking_room">?????t ph??ng</button>
                        </td>
                    </tr>`;
});
const containernav = document.querySelector(".conatiner_rooms");
containernav.innerHTML = `
<tr> <th>S??? PH??NG</th><th>PH?? H???P CHO</th><th>GI?? M???I ????M</th><th>?????T PH??NG</th> </tr>
${room.join("")}`;
var nameRooms = document.querySelectorAll(".name-room");

[...nameRooms].forEach(nameRoom => {
    nameRoom.onclick = function (e) {
        const idroom = e.target.dataset.idroom;
        const roomNumber =
            e.target.parentNode.querySelector("b.name-room").textContent;
        const servicesInRoom =
            e.target.parentNode.querySelector(".convenient").children;
        fetch(`http://localhost:1234/api/v1/images/images_of_room/${idroom}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 200) {
                    const modalContainer = document.querySelector(".modal-container");
                    modalContainer.style.display = "block";
                    modalContainer.innerHTML = modalRoom(
                        roomNumber,
                        data.data,
                        servicesInRoom
                    );
                    const closeModalButton = document.querySelector(".room-close");
                    const imagesInModal =
                        modalContainer.querySelector(".list-image").children;
                    const imagesInModalArray = [...imagesInModal];
                    imagesInModalArray.forEach((image) => {
                        image.onclick = (e) => {
                            document.querySelector(".showing-image").src = e.target.src;
                        };
                    });

                    closeModalButton.onclick = (e) => {
                        const modalShowRoomDetail =
                            document.querySelector(".show-detail-room");
                        modalShowRoomDetail.remove();
                        modalContainer.style.display = "none";
                    };
                    var listImage = document.querySelectorAll(".list-image img");
                    var prevControl = document.querySelector(".prev-control");
                    var imgFeature = document.querySelector(".img-feature");
                    var nextControl = document.querySelector(".next-control");
                    var roomClose = document.querySelector(".room-close i");
                    var showDetailRoom = document.querySelector(".show-detail-room");

                    var indexCurrent = 0;
                    function updateImageByindex (index = 0) {
                        // remove active class
                        document.querySelectorAll(".list-image div").forEach((item) => {
                            item.classList.remove("active1");
                        });
                        indexCurrent = index;
                        imgFeature.src = listImage[index].getAttribute("src");
                        listImage[index].parentElement.classList.add("active1");
                    }

                    listImage.forEach((imgElement, index) => {
                        imgElement.addEventListener("click", (e) => {
                            updateImageByindex(index);
                        });
                    });

                    prevControl.addEventListener("click", (e) => {
                        if (indexCurrent == 0) {
                            indexCurrent = listImage.length - 1;
                        } else {
                            indexCurrent--;
                        }
                        updateImageByindex(indexCurrent);
                    });

                    nextControl.addEventListener("click", (e) => {
                        if (indexCurrent == listImage.length - 1) {
                            indexCurrent = 0;
                        } else {
                            indexCurrent++;
                        }
                        updateImageByindex(indexCurrent);
                    });

                    roomClose.onclick = function () {
                        showDetailRoom.style.display = "none";
                    };
                    Payment();
                    updateImageByindex(0);
                } else {
                    alert("ko co anh");
                }
            });
    };
});

const bookingRooms = document.querySelectorAll(".booking_room");
bookingRooms.forEach(bookingRoom => {
    bookingRoom.onclick = (e) => {
        const roomId = e.target.dataset.idroom;
        const bookingRequestValues = document.querySelectorAll(".booking-request");
        const request = [...bookingRequestValues].reduce((prev, next) => {
            let value = next.value;
            if (next.dataset.request.includes("Number")) {
                value = parseInt(value);
            }
            if (next.dataset.request.includes("date")) {
                value = value.split("-").reverse().join("-");
            }
            return {
                ...prev,
                [next.dataset.request]: value,
            };
        }, {});
    
        request.customerId = JSON.parse(localStorage.getItem("login")).customerId;
        request.roomId = roomId;
        fetchBooking(request);
    };
})

function fetchBooking (data) {
    fetch("http://localhost:1234/api/v1/core/booking", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 200 || data.code === 403) {
                alert(data.message);
            }
        });
}

var navs = document.querySelectorAll(".list_city > li > a");
function myFunction () {
    var header = document.querySelector("header");
    if (window.pageYOffset > 0) {
        header_logo.style.color = "#f44336";
        header.style.backgroundColor = "#fff";
        navs.forEach((item, index) => {
            if (index < navs.length) {
                item.style.color = "black";
                headerNavIcon.style.color = "black";
                if (headerNavIcon.style.borderColor !== "rgb(244, 67, 54)") {
                    headerNavIcon.style.borderColor = "black";
                }
                hoverEvent(item.style.color);
            }
        });
    } else {
        header_logo.style.color = "#fff";
        header.style.backgroundColor = "transparent";
        navs.forEach((item, index) => {
            if (index < navs.length) {
                item.style.color = "white";
                headerNavIcon.style.color = "white";
                if (headerNavIcon.style.borderColor !== "rgb(244, 67, 54)") {
                    headerNavIcon.style.borderColor = "white";
                }
                hoverEvent(item.style.color);
            }
        });
    }
}
function hoverEvent (color) {
    navs.forEach((item, index) => {
        if (index < navs.length - 1) {
            item.onmouseover = function () {
                this.style.color = "#f44336";
            };
            item.onmouseleave = function () {
                this.style.color = color;
            };
        }
    });
}

var headerNavForm = document.querySelector(".header-nav-form");
var headerForm = document.querySelector(".header-form");
var headerFormLogin = headerNavForm.querySelector(".header-form-login");
var headerFormLogout = document.querySelector(".header-form-logout");
var login = window.localStorage.getItem("login");

headerNavForm.onclick = function () {
    if (headerForm.style.display === "none") headerForm.style.display = "block";
    else {
        headerForm.style.display = "none";
    }

    handleIconLight();
};

function handleIconLight () {
    var iconList = headerNavIcon.querySelectorAll("i");
    iconList.forEach((item) => {
        if (
            (headerFormLogout && headerFormLogout.style.display !== "none") ||
            (headerFormLogin && headerFormLogin.style.display !== "none")
        ) {
            item.style.color = "#f44336";
            headerNavIcon.style.borderColor = "#f44336";
        } else {
            item.style.color = "unset";
            headerNavIcon.style.borderColor = "unset";
        }
    });
}

// -------------Search-------------------
const inputSearch = document.querySelector(".input-search");
const autoBox = document.querySelector(".autobox");
inputSearch.onkeyup = (e) => {
    autoBox.style.paddingTop = "4px";
    let checkData = e.target.value;
    let dataArray = [];
    if (checkData) {
        dataArray = recomentList.filter((data) => {
            return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase());
        });
        dataArray = dataArray.map((data) => {
            return (data = "<li>" + data + "</li>");
        });
        autoBox.classList.add("active");
        showAdress(dataArray);
        let liItem = autoBox.querySelectorAll("li");
        for (let i = 0; i < liItem.length; i++) {
            liItem[i].addEventListener("click", function () {
                inputSearch.value = liItem[i].innerHTML;
                autoBox.classList.remove("active");
            });
        }
    } else {
        autoBox.classList.remove("active");
        autoBox.style.paddingTop = "0px";
    }
};
function showAdress (list) {
    let listData;
    if (!list.length) {
        listData = "<li>" + inputSearch.value + "</li>";
    } else {
        listData = list.join("");
    }
    autoBox.innerHTML = listData;
}
let recomentList = [
    "S??n Tr??",
    "Ng?? H??nh S??n",
    "H???i Ch??u",
    "Thanh Kh??",
    "Li??n Chi???u",
    "C???m L???",
    "H??a Vang",
    "Ho??ng Sa",
];

// -------------Number of peolpe-------------
const inputNumber = document.querySelector(".number-people");
const numberBox = document.querySelector(".number-box");
const numberClose = document.querySelector(".number-close");

inputNumber.addEventListener("click", function () {
    numberBox.classList.add("active");
});
numberClose.addEventListener("click", function () {
    numberBox.classList.remove("active");
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 27) {
        numberBox.classList.remove("active");
    }
});

const adultPlus = document.querySelector(".adultPlus");
const adultMinus = document.querySelector(".adultMinus");
let adultValue = document.querySelector(".adult span");
let i = 0;
adultPlus.addEventListener("click", function () {
    i = i + 1;
    adultValue.innerHTML = i;
    totalNumber();
});
adultMinus.addEventListener("click", function () {
    if (i <= 0) {
        i = 0;
    } else {
        i = i - 1;
        adultValue.innerHTML = i;
        totalNumber();
    }
});

const childPlus = document.querySelector(".childPlus");
const childMinus = document.querySelector(".childMinus");
let childValue = document.querySelector(".child span");
let j = 0;
childPlus.addEventListener("click", function () {
    j = j + 1;
    childValue.innerHTML = j;
    totalNumber();
});
childMinus.addEventListener("click", function () {
    if (j <= 0) {
        j = 0;
    } else {
        j = j - 1;
        childValue.innerHTML = j;
        totalNumber();
    }
});

const roomPlus = document.querySelector(".roomPlus");
const roomMinus = document.querySelector(".roomMinus");
let roomValue = document.querySelector(".room span");
let k = 0;
roomPlus.addEventListener("click", function () {
    k = k + 1;
    roomValue.innerHTML = k;
    totalNumber();
});
roomMinus.addEventListener("click", function () {
    if (k <= 0) {
        k = 0;
    } else {
        k = k - 1;
        roomValue.innerHTML = k;
        totalNumber();
    }
});

function totalNumber () {
    total = i + j + k;
    inputNumber.value = i + j + " Ng?????i, " + k + " ph??ng";
}

// ---------------detail room------------
function Detailroom () {
    var images = document.querySelectorAll(".detail-room-img");
    var prev = document.querySelector(".prev");
    var next = document.querySelector(".next");
    var close = document.querySelector(".close");

    var galleryImg = document.querySelector(".gallery-inner img");
    var gallery = document.querySelector(".gallery");

    var currentIndex = 0;

    function showGallery () {
        if (currentIndex == 0) {
            prev.classList.add("hide");
        } else {
            prev.classList.remove("hide");
        }

        if (currentIndex == images.length - 1) {
            next.classList.add("hide");
        } else {
            next.classList.remove("hide");
        }

        // display
        galleryImg.src = images[currentIndex].src;
        gallery.classList.add("show");
        header.style.display = "none";
    }

    images.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            showGallery();
        });
    });

    close.onclick = function () {
        gallery.classList.remove("show");
        header.style.display = "block";
    };

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 27) {
            gallery.classList.remove("show");
        }
    });

    prev.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            showGallery();
        }
    });

    next.addEventListener("click", function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            showGallery();
        }
    });
}

// -----------function booked------
var comments = document.querySelector(".comments");
var formSubmitA = document.querySelector(".form-submit a");
if (!localStorage.getItem("login")) {
    formSubmitA.onclick = () => {
        formSubmitA.href = "http://127.0.0.1:5500/FrontEnd/signin/index.html";
    };
    comments.style.display = "none";
} else {
    comments.style.display = "block";
}

// ---------light star comment-----------
let ratingcount = 0;
var cmtIcon = document.querySelectorAll(".cmt-icon i");
cmtIcon.forEach((i, ind) => {
    i.onclick = function (e) {
        if (
            e.target.style.color === "rgb(255, 188, 57)" &&
            ind === ratingcount - 1
        ) {
            cmtIcon.forEach((i) => {
                i.style.color = "rgb(218, 220, 221)";
            });
            ratingcount = 0;
        } else {
            cmtIcon.forEach((i) => {
                i.style.color = "rgb(218, 220, 221)";
            });
            cmtIcon.forEach((i, index) => {
                if (ind >= index) {
                    i.style.color = "rgb(255, 188, 57)";
                }
            });
            ratingcount = ind + 1;
        }
    };
});

// ------------ lo???i ph??ng -----------

// ---------------- slide room---------
// var imgFeature = document.querySelector(".img-feature");
// var listImage = document.querySelectorAll(".list-image img");
// var prevControl = document.querySelector(".prev-control");
// var nextControl = document.querySelector(".next-control");

// var indexCurrent = 0;
// function updateImageByindex(index) {
//     // remove active class
//     document.querySelectorAll('.list-image div').forEach(item => {
//         item.classList.remove('active1')
//     })
//     indexCurrent = index
//     imgFeature.src = listImage[index].getAttribute('src')
//     listImage[index].parentElement.classList.add('active1')
// }

// listImage.forEach((imgElement, index) => {
//     imgElement.addEventListener('click', e => {
//         updateImageByindex(index)

//     })
// })

// prevControl.addEventListener('click', e => {
//     if(indexCurrent == 0) {
//         indexCurrent = listImage.length - 1
//     }
//     else {
//         indexCurrent--
//     }
//     updateImageByindex(indexCurrent)
// })

// nextControl.addEventListener('click', e => {
//     if(indexCurrent == listImage.length - 1) {
//         indexCurrent = 0
//     }
//     else {
//         indexCurrent++
//     }
//     updateImageByindex(indexCurrent)
// })

// roomClose.onclick = function () {
//     showDetailRoom.style.display = 'none'
// }

// updateImageByindex(0)

// ---------------- payment -----------------
function Payment () {
    var radioYes = document.querySelector(".radio-yes");
    var radioNo = document.querySelector(".radio-no");
    var creditcardSection = document.querySelector(".creditcard-section");
    var cashSection = document.querySelector(".cash-section");
    var payclose = document.querySelector(".payclose");
    var choosePayment = document.querySelector(".choose-payment");
    var reserve = document.querySelector(".reserve button");

    radioYes.onclick = function () {
        creditcardSection.style.display = "flex";
        cashSection.style.display = "none";
    };

    radioNo.onclick = function () {
        creditcardSection.style.display = "none";
        cashSection.style.display = "block";
    };

    payclose.onclick = function () {
        choosePayment.style.display = "none";
    };

    reserve.onclick = function (e) {
        // e.preventDefault()
        choosePayment.style.display = "block";
    };
}
// ---------render t??n qu???n huy???n--------
const place = JSON.parse(localStorage.getItem("place"));

fetch("http://localhost:1234/api/v1/hotels/get_by_id/" + hotelId)
    .then((response) => response.json())
    .then((data) => {
        if (data.code === 200) {
            const headerPath = document.querySelector(".header-path");
            headerPath.innerHTML = `<li><a href="../home/index.html">Trang ch???</a></li>
                            <li><a href="">${place.replaceAll(
                "_",
                " "
            )}</a></li>
                            <p>
                                <div class="header-path-name">?????t ph??ng Kh??ch S???n > ${data.data.hotelName
                }</div>
                            </p>`;
        }
    });

// ------------gg map------------
const key = "Xx2LVdpWdk1UyVYRKzN0";
const map = new maplibregl.Map({
    container: "map", // container id
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`, // style URL
    center: [108.203403, 16.039226], // starting position [lng, lat]
    zoom: 10, // starting zoom
});
map.addControl(new maplibregl.NavigationControl(), "top-right");
class searchControl {
    onAdd (map) {
        this._map = map;
        this._container = document.createElement("div");
        this._container.className = "maplibregl-ctrl";
        const _input = document.createElement("input");
        this._container.appendChild(_input);
        const geocoder = new maptiler.Geocoder({
            input: _input,
            key: key,
        });
        geocoder.on("select", function (item) {
            map.fitBounds(item.bbox);
            const marker = new maplibregl.Marker().setLngLat(item.center).addTo(map);
        });
        return this._container;
    }
    onRemove () {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}
const marker = new maplibregl.Marker();

map.addControl(new searchControl(), "top-left");

// --------------------review--------------
reviewButton.onclick = (e) => {
    const reviewContent = document.querySelector(
        ".cmt-text.review-request"
    ).value;

    const customerId = JSON.parse(localStorage.getItem("login")).customerId;
    if (!hotelId) {
        alert("Kh??ng t??m th???y hotel mu???n review");
        return;
    }
    if (!reviewContent) {
        alert("Vui l??ng nh???p n???i dung review");
        return;
    }
    newReview({
        customerId,
        hotelId,
        content: reviewContent,
        starNumber: ratingcount,
    });
    cmt = [{
        customerId,
        hotelId,
        content: reviewContent,
        starNumber: ratingcount,
    }];
    document.querySelector(".cmt-text.review-request").value = "";
};
function commentsroom () {
    const formReviews = document.querySelector(".form-reviews");
    fetch(`http://localhost:1234/api/v1/reviews/reviews_of_hotel/${hotelId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.code === 200) {
                data.data.sort((a, b) => {
                    const dataPrev = new Date(a.createdAt);
                    const dataNext = new Date(b.createdAt);
                    return dataPrev - dataNext;
                });
                console.log(data.data);
                const comment = data.data.reverse().map((e, index) => {
                    const date = new Date(e.createdAt);
                    return index < 6
                        ? handleRenderCommentList(
                            e.reviewId,
                            e.Customer.Image.url,
                            e.Customer.username,
                            date.getDate(),
                            date.getMonth() + 1,
                            date.getFullYear(),
                            e.content,
                            e.starNumber
                        )
                        : "";
                });
                formReviews.innerHTML = comment.join("");
            }
        });
}
commentsroom();

function newReview (data) {
    fetch("http://localhost:1234/api/v1/reviews/review_hotel", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            commentsroom();
            fetch(`http://localhost:1234/api/v1/reviews/reviews_of_hotel/${hotelId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.code === 200) {
                        if (data.data.length < 7) {
                            showMoreSpan.style.display = "none";
                        } else {
                            showMoreSpan.onclick = function () {
                                formShowMore.style.display = "block";
                                data.data.sort((a, b) => {
                                    const dataPrev = new Date(a.createdAt);
                                    const dataNext = new Date(b.createdAt);
                                    return dataPrev - dataNext;
                                });
                                const comment = data.data.reverse().map((e, index) => {
                                    const date = new Date(e.createdAt);
                                    return handleRenderCommentList(
                                        e.reviewId,
                                        e.Customer.Image.url,
                                        e.Customer.username,
                                        date.getDate(),
                                        date.getMonth() + 1,
                                        date.getFullYear(),
                                        e.content,
                                        e.starNumber
                                    );
                                });
                                formShowMore.innerHTML =
                                    `<div class="cmt-close">
                                <i class="fa-solid fa-xmark"></i>
                            </div>`+ `<h3>T???t c??? ????nh gi??</h3>` +
                                    comment.join("")
                                    ;
                                var cmtClose = document.querySelector(".cmt-close");
                                cmtClose.onclick = function () {
                                    formShowMore.innerHTML = "";
                                    formShowMore.style.display = "none";
                                };
                            };
                        }
                    }
                });
                commentsroom();
        });
}

// -------------form show more comment-----------
var showMoreSpan = document.querySelector(".show-more span");
var formShowMore = document.querySelector(".form-show-more");

fetch(`http://localhost:1234/api/v1/reviews/reviews_of_hotel/${hotelId}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.code === 200) {
            if (data.data.length < 7) {
                showMoreSpan.style.display = "none";
            } else {
                showMoreSpan.onclick = function () {
                    formShowMore.style.display = "block";
                    data.data.sort((a, b) => {
                        const dataPrev = new Date(a.createdAt);
                        const dataNext = new Date(b.createdAt);
                        return dataPrev - dataNext;
                    });

                    const comment = data.data.reverse().map((e, index) => {
                        const date = new Date(e.createdAt);
                        return handleRenderCommentList(
                            e.reviewId,
                            e.Customer.Image.url,
                            e.Customer.username,
                            date.getDate(),
                            date.getMonth() + 1,
                            date.getFullYear(),
                            e.content,
                            e.starNumber
                        );
                    });
                    formShowMore.innerHTML =
                        `<div class="cmt-close">
                          <i class="fa-solid fa-xmark"></i>
                      </div>`+ `<h3>T???t c??? ????nh gi??</h3>` +
                        comment.join("")
                        ;
                    var cmtClose = document.querySelector(".cmt-close");
                    cmtClose.onclick = function () {
                        formShowMore.innerHTML = "";
                        formShowMore.style.display = "none";
                    };
                };
            }
        }
    });
function starPoint(stars) {
    let star = []
    for (let i = 0; i < stars; i++) {
        star.push(`<i class="fa-solid fa-star"></i>`)
    }
    return star.join("")
}
function handleRenderCommentList (
    reviewid,
    avatar,
    username,
    date,
    month,
    year,
    content,
    star
) {
    return `
    <div id=${reviewid} class="wrap-reviews">
        <div class="wrap-reviews-top">
            <img class="review-avatar" src=${avatar ||
        "https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-avt-n%E1%BB%AF-t%C3%B3c-ng%E1%BA%AFn-%C4%91%E1%BA%B9p.jpg"
        } alt="">
            <div class="review-info">
                <span class="review-name">${username}</span> <br>
                <div class="review-rate-star">
                ${starPoint(star)}
                </div>
                <span class="review-date">${date}/${month}/${year}</span>
            </div>
        </div>
        <div class="wrap-reviews-bottom">${content}</div>
    </div>`;
}
