$(function() {
    function startSearch(searchValue) {
        console.log("Search value: " + searchValue);
        $.post('/start', {url: searchValue}, function (results) {
            console.log('start success: ' + results);
            getWordCount(results);
        }).fail(function (xhr) {
            console.log(xhr);
        });
    }

    function getWordCount(jobID) {
        var timeout = '';

        var poller = function() {
            $.get('/results/' + jobID, function(data, status, xhr) {
                if (xhr.status === 200) {
                    clearTimeout(timeout);
                    console.log(data);
                    var resultsHtml = '';
                    data.forEach(function (item) {
                        resultsHtml += '<tr><td>' + item[0] + '</td><td>' + item[1] + '</td></tr>';
                    });
                    document.querySelector('#results').innerHTML = resultsHtml;
                } else {
                    timeout = setTimeout(poller, 2000);
                }
            }).fail(function (xhr) {
                console.log(xhr);
            });
        };
        poller();
    }

    $('#search_form').submit(function (e) {
        e.preventDefault();
        startSearch($('#url-box').val());
    });
});
