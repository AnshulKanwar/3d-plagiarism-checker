   var textarea = document.getElementById('code');
    var reset = document.getElementById('reset');
    var solution = document.getElementById('solution');
    var output = document.querySelector('.output');
    var code = textarea.value;
    var userEntry = textarea.value;

    function updateCode() {
        output.innerHTML = textarea.value;
    }

    reset.addEventListener('click', function() {
        textarea.value = code;
        userEntry = textarea.value;
        solutionEntry = htmlSolution;
        solution.value = 'Show solution';
        updateCode();
    });

    solution.addEventListener('click', function() {
        if (solution.value === 'Show solution') {
            textarea.value = solutionEntry;
            solution.value = 'Hide solution';
        } else {
            textarea.value = userEntry;
            solution.value = 'Show solution';
        }
        updateCode();
    });

    var htmlSolution = '<h1>Important notice</h1>\n<p>On <strong>Sunday January 9th 2010</strong>, a gang of <em>goths</em> were spotted stealing <strong><em>several</em> garden gnomes</strong> from a shopping center in downtown <strong>Milwaukee</strong>. They were all wearing <em>green jumpsuits</em> and <em>silly hats</em>, and seemed to be having a whale of a time. If anyone has <strong>any</strong> information about this incident, please contact the police <strong>now</strong>.</p>';
    var solutionEntry = htmlSolution;

    textarea.addEventListener('input', updateCode);
    window.addEventListener('load', updateCode);

    // stop tab key tabbing out of textarea and
    // make it write a tab at the caret position instead

    textarea.onkeydown = function(e) {
        if (e.keyCode === 9) {
            e.preventDefault();
            insertAtCaret('\t');
        }

        if (e.keyCode === 27) {
            textarea.blur();
        }
    };

    function insertAtCaret(text) {
        var scrollPos = textarea.scrollTop;
        var caretPos = textarea.selectionStart;

        var front = (textarea.value).substring(0, caretPos);
        var back = (textarea.value).substring(textarea.selectionEnd, textarea.value.length);
        textarea.value = front + text + back;
        caretPos = caretPos + text.length;
        textarea.selectionStart = caretPos;
        textarea.selectionEnd = caretPos;
        textarea.focus();
        textarea.scrollTop = scrollPos;
    }

    // Update the saved userCode every time the user updates the text area code

    textarea.onkeyup = function() {
        // We only want to save the state when the user code is being shown,
        // not the solution, so that solution is not saved over the user code
        if (solution.value === 'Show solution') {
            userEntry = textarea.value;
        } else {
            solutionEntry = textarea.value;
        }

        updateCode();
    };
