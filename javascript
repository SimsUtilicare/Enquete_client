form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        // URL de votre script Google Apps Script
        const scriptURL = 'https://script.google.com/macros/s/ID_DU_SCRIPT/exec';

        // Envoi des données via POST
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.result === 'success') {
            // Afficher le QR code après l'envoi du formulaire
            form.style.display = 'none';
            qrCodeContainer.style.display = 'block';

            // Mettre à jour l'image du QR code si nécessaire
            qrCodeImage.src = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://www.votre-lien.com&choe=UTF-8";

            // Réinitialiser automatiquement après 5 secondes
            setTimeout(() => {
                qrCodeContainer.style.display = 'none'; // Masquer le QR code
                form.style.display = 'block';          // Réafficher le formulaire
                form.reset();                          // Réinitialiser les champs du formulaire
            }, 5000); // 5000 millisecondes = 5 secondes
        } else {
            alert(`Erreur : ${result.message}`);
        }
    } catch (error) {
        alert('Une erreur est survenue lors de l\'envoi du formulaire.');
        console.error(error);
    }
});
