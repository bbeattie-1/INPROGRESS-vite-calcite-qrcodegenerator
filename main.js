const form = document.querySelector('#form')
const downloadButton = document.querySelector('#downloadButton')
const loader = document.querySelector('calcite-loader')
const qrcodeContainer = document.querySelector('#qrcode-wrapper')
const informationButton = document.querySelector('#informationButton')
const emptyURLAlert = document.querySelector('#emptyURLAlert')
emptyURLAlert.open = false

let qrcode;
let qrcodeImage;

const onSubmit = (e) => {
    e.preventDefault()
    clearQRCode()
    showLoader()
    
    const url = document.querySelector('#urlInput').value
    const size = document.querySelector('#sizeInput').value
    const color = document.querySelector('#colorChipGroup > calcite-chip[selected]').value

    setTimeout(() => {
        hideLoader()

        createQR(url, size, color)
    }, 1500)
}

const createQR = (url, size, color = '#000') => {

    if (!url) {
        emptyURLAlert.open = true
    } else {

    emptyURLAlert.open = false
    qrcode = new QRCode(qrcodeContainer, {
        text: url,
        width: size,
        height: size,
        colorDark: color
    })

    qrcodeImage = document.querySelector("#qrcode-wrapper canvas")
    
    const downloadButton = document.createElement("calcite-button")
    downloadButton.id = "downloadButton"
    downloadButton.iconEnd = "download-to"
    downloadButton.innerHTML = "Download"
    downloadButton.width = "full"
    downloadButton.kind = "inverse"
    downloadButton.style.marginInline = "auto"
    downloadButton.href = qrcodeImage.toDataURL()
    downloadButton.setAttribute("download", `QR Code`)

    document.querySelector("#output-wrapper").appendChild(downloadButton)
}
}

const clearQRCode = () => {
    qrcodeContainer.innerHTML = ''
    const downloadButton = document.querySelector('#downloadButton')
    if (downloadButton) {
        downloadButton.remove()
    }
}

const showLoader = () => {
    loader.style.display = 'block'
}

const hideLoader = () => {
    loader.style.display = 'none'
}

const displayInfo = (e) => {
  const infoDialog = document.querySelector('#infoDialog')
  infoDialog.toggleAttribute("open")
}

informationButton.addEventListener("click", displayInfo)
form.addEventListener("submit", onSubmit)