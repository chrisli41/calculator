/**
 * Created by christopherli on 10/18/16.
 */

$(document).ready(function(){
    
    var entry = '';
    var current = '';
    var ans = '';
    var history = '';

    var operations = ['+', '-', '/', '*'];
    var symbols = operations.concat(['=', '.', 'ce', 'ac']);

    function replace(input){
        return input.replace(/[/]/gi, '÷').replace(/[*]/gi, 'x');
    }

    function lengthCheck(input){
        return input.length > 13 ? input.slice(-13) : input;
    }

    $('button').click(function(){
        
        entry = $(this).val();

        if(symbols.indexOf(entry) === -1){
            current += entry;
            ans += entry;

            $('#output').text(lengthCheck(current));
        }

        else if(entry === '.' && current.indexOf('.') === -1){
            if(symbols.indexOf(current[current.length - 1]) === -1){
                current += entry;
                ans += entry;
                $('#output').text(current);
            }
        }

        else if(operations.indexOf(entry) !== -1){
            if(current !== '' && symbols.indexOf(current[current.length - 1]) === -1){

                history = replace(ans.toString());
                ans = eval(ans);

                $('#output').text(lengthCheck(ans));
                $('#output-history').text(lengthCheck(history));

                current = '';
                ans += entry;
            }
            else if(operations.indexOf(ans[ans.length - 1]) !== -1){
                ans = ans.slice(0, -1);
                $('#output').text(ans);
                ans += entry;
            }
        }

        else if(entry === '=' && current[current.length - 1] !== '.'){

            history = replace(ans.toString());
            ans = eval(ans);
            current = ans.toString();

            $('#output').text(lengthCheck(ans));
            $('#output-history').text(lengthCheck(history));
        }

        else if (entry === 'ce'){
            if(current.length !== 0) {
                ans = ans.toString().slice(0, -current.length);
                current = '';

                $('#output').text(lengthCheck(current));
            }
        }

        else if(entry === 'ac'){
            current = '';
            ans = '';
            history = '';

            $('#output').text(ans);
            $('#output-history').text(history);
        }

        console.log('entry: ' + entry);
        console.log('current: ' + current);
        console.log('ans: ' + ans);

    });

});