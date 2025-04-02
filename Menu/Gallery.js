document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("https://my-backend-6hi7.onrender.com/api/Images");
        const data = await response.json();

        if (data.images && data.images.length > 0) {
            const galleryContainer = document.getElementById("gallery-images");

            data.images.forEach((imageUrl, index) => {
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("gallery-item");

                // Create a loading spinner
                const loader = document.createElement("div");
                loader.classList.add("loader");

                // Create an image element
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Gallery Image";
                img.classList.add("gallery-img");
                img.style.display = "none"; // Hide image until loaded

                // Show image when it's fully loaded
                img.onload = function () {
                    loader.style.display = "none"; // Hide the loader
                    img.style.display = "block"; // Show the image
                };

                // Create a download button
                const downloadButton = document.createElement("button");
                downloadButton.textContent = "Download";
                downloadButton.classList.add("download-btn");

                // Automatic file download
                downloadButton.onclick = async function () {
                    try {
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        const blobUrl = URL.createObjectURL(blob);
                        
                        // Create a temporary <a> element to trigger download
                        const a = document.createElement("a");
                        a.href = blobUrl;
                        a.download = `Image_${index + 1}.jpg`; // Sets the file name
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);

                        // Revoke Blob URL to free memory
                        URL.revokeObjectURL(blobUrl);
                    } catch (error) {
                        console.error("Download failed:", error);
                    }
                };

                // Append loader, image, and download button to the container
                imgContainer.appendChild(loader);
                imgContainer.appendChild(img);
                imgContainer.appendChild(downloadButton);

                // Append to the gallery div
                galleryContainer.appendChild(imgContainer);
            });
        } else {
            document.getElementById("gallery-images").innerHTML = "<p>No images found.</p>";
        }
    } catch (error) {
        console.error("Error loading images:", error);
        document.getElementById("gallery-images").innerHTML = "<p>Failed to load images.</p>";
    }
});
