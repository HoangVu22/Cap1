// ---------header------------
var headerNavForm = document.querySelector(".header-nav-form");
var headerForm = document.querySelector(".header-form");
var headerFormLogin = headerNavForm.querySelector(".header-form-login");
var headerFormLogout = document.querySelector(".header-form-logout");
const accountinfo = document.querySelector(".account-info");
const formProfile = document.querySelector(".form-profile");

const login = JSON.parse(localStorage.getItem("login"));

fetch('http://localhost:1234/api/v1/images/avatar_of_customer/' + login.customerId)
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            const avatarImg = document.querySelector('img.avatar-img')
            avatarImg.src = data.data ? data.data.url : 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-avt-n%E1%BB%AF-t%C3%B3c-ng%E1%BA%AFn-%C4%91%E1%BA%B9p.jpg'
        }
    })

headerNavForm.onclick = function () {
    if (headerForm.style.display === "none") headerForm.style.display = "block";
    else {
        headerForm.style.display = "none";
    }

    handleIconLight();
};
const headerNavIcon = document.querySelector(".header-nav-icon")
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

// -------------profile--------------
var profile = document.querySelector(".profile");
var profileRight = document.querySelector(".profile-right");
var profileRightEdit = document.querySelector(".profile-right-edit");
var profileRightTopBtn = document.querySelector(".profile-right-top button");
var profileSaveBtn = document.querySelector(".profile-save button");
var profileSaveP = document.querySelector(".profile-save p");

profileRightTopBtn.onclick = function () {
    if (profileRightEdit) {
        if (profileRightEdit.style.display === "block") {
            profileRightEdit.style.display = "none";
            profileRight.style.display = "block";
        } else {
            profileRightEdit.style.display = "block";
            profileRight.style.display = "none";
        }
    }
};

function edit () {
    profileRightEdit.style.display = "none";
    profileRight.style.display = "block";
}

// profileSaveBtn.onclick = edit;
profileSaveP.onclick = edit;

// ----------------------
const accountsidebarlink = document.querySelectorAll(".account-sidebar-link");
const profilegenaral = document.querySelectorAll(".profile-genaral");
accountsidebarlink.forEach((value, index) => {
    value.onclick = (e) => {
        if (!value.classList.contains("active")) {
            accountsidebarlink.forEach((e) => {
                e.classList.remove("active");
            });
            value.classList.add("active");
            profilegenaral.forEach((e) => {
                e.style.display = "none";
            });
            profilegenaral[index].style.display = "block";
        }
    };
});

function autoLoad() {
    const login = JSON.parse(localStorage.getItem('login'))
    var changeAvatar = document.querySelector(".change-avatar");
    var avatarImg = document.querySelector(".avatar-img");
    function handleChangeAvatar () {
        changeAvatar.click();
        changeAvatar.onchange = (e) => {
            const formData = new FormData()
            formData.append('avatar', e.target.files[0])
            formData.append('directory', 'avatars')
            fetch('http://localhost:1234/api/v1/upload/upload_avatar', {
                method: 'post',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        fetch('http://localhost:1234/api/v1/customers/update_avatar', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ customerId: login.customerId, url: data.data.fileUrl, name: data.data.filename })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.code === 200) {
                                    const avatarImg = document.querySelector('img.avatar-img')
                                    avatarImg.src = data.data.url
                                    const objAvatar = {
                                        ...login,
                                        avatarUrl: data.data.url,
                                        avatarName: data.data.imageName
                                    }
                                    localStorage.setItem("login", JSON.stringify(objAvatar))
                                    userName(objAvatar)
                                }
                            })
                    }
                })
        };
    }
    var avatarRef = document.querySelector(".fa-solid.fa-camera");
    avatarRef.onclick = handleChangeAvatar;
}

function accountInfomation (obj) {
    return `<div class="account-info-img">
  <img  class="avatar-img" src="" alt="">
  <input class="change-avatar" style="display: none" type="file">
  <i class="fa-solid fa-camera"></i>
</div>
<p>${obj && obj.username || login.username}</p>`;
}
accountinfo.innerHTML = accountInfomation();

function formProfilefn (obj) {
    return `<div class="form-profile-info">
  <label for="">S??? ??i???n tho???i</label>
  <div class="form-profile-name">${obj && obj.phone || login.phone || ""
        }</div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">H??? v?? t??n</label>
  <div class="form-profile-name">${obj && obj.username || login.username || ""
        }</div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">Email</label>
  <div class="form-profile-name">${obj && obj.email || login.email || ""
        }</div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">?????a ch???</label>
  <div class="form-profile-name">${obj && obj.address || login.address || ""
        }</div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">T??i kho???n li??n k???t</label>
  <div class="form-profile-name">
      <div class="form-profile-connect">
          <div class="form-profile-icon">
              <img src="https://go2joy.vn/images/icons/facebook.svg" alt="">
              <p>Facebook</p>
          </div>
          <div class="form-profile-link">
              <a href="">Li??n k???t</a>
          </div>
      </div>
      <div class="form-profile-connect">
          <div class="form-profile-icon">
              <img src="https://go2joy.vn/images/icons/google.svg" alt="">
              <p>Google</p>
          </div>
          <div class="form-profile-link">
              <a href="">H???y li??n k???t</a>
          </div>
          </div>
          </div>
          </div>`;
}
formProfile.innerHTML = formProfilefn();

const formprofileedit = document.querySelector(".form-profile-edit");
function profileUpdatefn (obj) {
    return `<div class="form-profile-info">
  <label for="">S??? ??i???n tho???i</label>
  <div class="form-profile-input">
      <input class="form-profile-text"  type="number" placeholder="Nh???p s??? ??i???n tho???i c???a b???n" value="${obj && obj.phone || login.phone}">
  </div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">H??? v?? t??n</label>
  <div class="form-profile-input">
      <input class="form-profile-text"  value="${obj && obj.username || login.username}"  type="text" placeholder="Nh???p h??? t??n c???a b???n">
  </div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">Email</label>
  <div class="form-profile-input">
      <input class="form-profile-text" disabled value=${obj && obj.email || login.email} type="text" placeholder="Nh???p email c???a b???n">
  </div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">?????a ch???</label>
  <div class="form-profile-input">
      <input class="form-profile-text" type="text" placeholder="Nh???p ?????a ch??? c???a b???n" value="${obj && obj.address || login.address}">
  </div>
</div>
<div class="form-line"></div>
<div class="form-profile-info">
  <label for="">T??i kho???n li??n k???t</label>
  <div class="form-profile-name">
      <div class="form-profile-connect">
          <div class="form-profile-icon">
              <img src="https://go2joy.vn/images/icons/facebook.svg" alt="">
              <p>Facebook</p>
          </div>
          <div class="form-profile-link">
              <a href="">Li??n k???t</a>
          </div>
      </div>
      <div class="form-profile-connect">
          <div class="form-profile-icon">
              <img src="https://go2joy.vn/images/icons/google.svg" alt="">
              <p>Google</p>
          </div>
          <div class="form-profile-link">
              <a href="">H???y li??n k???t</a>
          </div>
      </div>
  </div>
</div>`;
}
function userName(obj) {
    const user = JSON.parse(localStorage.getItem("login"));
    const headerName = document.querySelector(".avatar-login");
    headerName.innerHTML = `  <div class="header-form-avatar">
    <!-- <i class="fa-solid fa-circle-user"></i> -->
    <img src="${(obj && obj.avatarUrl) || user.avatarUrl}" alt="">
    <div class="header-name">
        <span>${(obj&& obj.userName) || user.username}</span>
        <p>Xem h??? s??</p>
    </div>
</div>`;
}

formprofileedit.innerHTML = profileUpdatefn();
autoLoad();

const profileUpdate = document.querySelector(".profile_update");
profileSaveBtn.onclick = () => {
    const inputChange = formprofileedit.querySelectorAll("input");
    const objProfile = {
        "phone": inputChange[0].value,
        "username": inputChange[1].value,
        "email": inputChange[2].value,
        "address": inputChange[3].value,
        "customerId": login.customerId
    };
    fetch("http://localhost:1234/api/v1/customers/update_profile", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(objProfile)
    })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                localStorage.setItem('login', JSON.stringify(data.data));
                const profile = data.data;
                formprofileedit.innerHTML = profileUpdatefn(profile);
                formProfile.innerHTML = formProfilefn(profile);
                accountinfo.innerHTML = accountInfomation(profile);
                userName(profile);
                edit();
            }
        });
};

// -------------???n hi???n ??i???u ki???n c???a Coupon-----------
var conditionBtn = document.querySelector('.condition .condition-btn');
var conditionContent = document.querySelector('.condition-content');
conditionBtn.onclick = function () {
    conditionContent.style.display = "block";
    conditionContent.innerHTML = handleRenderVoucher();
    var roomClose = document.querySelector('.room-close i');
    roomClose.onclick = function () {
        conditionContent.innerHTML = '';
        conditionContent.style.display = "none";
    };
};

function handleRenderVoucher () {
    return `<div class="my-coupon">
  <div class="coupon-img">
      <img src="../image/places/HoaVang.jpg" alt="">
  </div>
  <div class="coupon-content">
      <div class="coupon-content-top">
          <p>GI???M 50% - T???I ??A 50K</p>
      </div>
      <div class="coupon-content-bottom">
          <div class="closing-date">
              <span>Gi???m 50%</span>
              <p>H???t h???n 1/1/2023</p>
          </div>
      </div>
  </div>
</div>
<div class="coupon-description">
  <ul>
      <li>Ch??c m???ng b???n ???? nh???n ???????c <b>Coupon 50%</b> (t???i ??a 50.000??), <b>h???n s??? d???ng trong 7 ng??y k??? t??? ng??y nh???n coupon.</b></li>
      <li>??p d???ng t???i c??c <b>kh??ch s???n trong danh s??ch.</b></li>
      <li>Coupon kh??ng ???????c ??p d???ng c??ng v???i ch????ng tr??nh Gi???m gi?? ?????c bi???t.</li>
      <li>Th???i gian ?????t ph??ng: <b>T??? Th??? Hai ?????n Ch??? Nh???t.</b></li>
      <li>Coupon kh??ng ???????c quy ?????i th??nh ti???n m???t, kh??ng ???????c ph??p chuy???n nh?????ng d?????i b???t k??? h??nh th???c n??o.</li>
      <li>BCRoom c?? quy???n t??? ch???i tr??? ph?? khuy???n m??i n???u ph??t hi???n gian l???n ho???c vi ph???m c??c ??i???u kho???n c???a ch????ng tr??nh khuy???n m??i n??y.</li>
  </ul>
</div>
<div class="room-close">
  <i class="fa-solid fa-xmark"></i>
</div>`;
}


// ---------------------------------------------------
