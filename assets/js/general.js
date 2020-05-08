/*!
 * HabboVibes.de - Wir lieben gute Musik!
 * 
 * @author   Gummiauge (Habbo.de)
 * @version  1.0.0
 */

$(function () {
    // Radiostatus laden und automatisch aktualisieren
    addInterval(() => {
        $('#radiostatus #programm').html('Radiostatus wird geladen...');
        $('#radiostatus #deejay_says span').html('...');

        $.getJSON('api.json', function (response) {
            var song = response.songtitle.split(' - ');

            $('#radiostatus #programm').html(`
                <div class="title">${marquee(response.programm, 35, 'alternate')}</div>
                <div class="subtitle">mit DJ ${response.deejay}</div>
                <div class="title">${song[0] ? marquee(song[0], 35, 'alternate') : ''}</div>
                <div class="subtitle">${song[1] ? marquee(song[1], 45, 'alternate') : ''}</div>
            `);

            $('#radiostatus #habbo').css('background-image', `url('assets/images/microphone.png'), url('https://www.habbo.de/habbo-imaging/avatarimage?user=${response.deejay}&action=drk&direction=4&head_direction=3&gesture=sml&size=l')`);

            $('#radiostatus #deejay_says span').html(marquee(response.deejay_says, 60));
        });
    }, 60 * 1000);

    // Newsslider
    $('#topnews').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        draggable: false,
        dots: true
    });
});

/**
 * Interval setzen und Callback sofort ausführen
 * @param {Function} callback 
 * @param {int} timeout 
 */
function addInterval(callback, timeout) {
    callback(); // Run for first time
    setInterval(callback, timeout);
}

/**
 * Prüfen, ob Text lang genug ist für Marquee
 * @param {string} data 
 * @param {int} length 
 * @param {string} behavior 
 */
function marquee(data, length, behavior) {
    if (!behavior) behavior = 'scroll';

    if (data.length >= length) {
        return `<marquee behavior="${behavior}" scrollamount="${behavior == 'scroll' ? '6' : '3'}" onmouseover="this.stop();" onmouseout="this.start();">${data}</marquee>`;
    }

    return data;
}