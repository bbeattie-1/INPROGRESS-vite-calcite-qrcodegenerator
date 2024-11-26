const form = document.querySelector('#form')
const downloadButton = document.querySelector('#downloadButton')
const loader = document.querySelector('calcite-loader')
const qrcodeContainer = document.querySelector('#qrcode-wrapper')

let qrcode;
let qrcodeImage;

const onSubmit = (e) => {
    e.preventDefault()
    clearQRCode()
    showLoader()
    
    const url = document.querySelector('#urlInput').value
    const size = document.querySelector('#sizeInput').value

    setTimeout(() => {
        hideLoader()
        createQR(url, size)
    }, 1500)
}

const createQR = (url, size) => {
    qrcode = new QRCode(qrcodeContainer, {
        text: url,
        width: size,
        height: size
    })

    qrcodeImage = document.querySelector("#qrcode-wrapper canvas")
    
    const downloadButton = document.createElement("calcite-button")
    downloadButton.id = "downloadButton"
    downloadButton.iconEnd = "download-to"
    downloadButton.innerHTML = "Download"
    downloadButton.width = "full"
    downloadButton.style.marginInline = "auto"
    downloadButton.href = qrcodeImage.toDataURL()
    downloadButton.setAttribute("download", `QR Code`)

    document.querySelector("#output-wrapper").appendChild(downloadButton)
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

form.addEventListener("submit", onSubmit)