class Game {
    constructor(){
        this.slots = [
            {id: 1, char: 'x'},
            {id: 2, char: 'x'},
            {id: 3, char: 'x'},
            {id: 4, char: ' '},
            {id: 5, char: 'o'},
            {id: 6, char: 'o'},
            {id: 7, char: 'o'}];
        this.slotsDiv = document.querySelectorAll('.slot');
        this.draw();
        this.counter = 0;
        this.counterSpan = document.querySelector('.counter');
        this.resetBtn = document.querySelector('.reset');
        this.resetBtn.addEventListener('click', ()=>{
            this.reset();
        });
    }
    draw(){
        this.slots.forEach((el, i)=>{
            this.slotsDiv[i].innerHTML = '';
            const item = document.createElement('div');
            if(el.char!=''){
                item.classList.add('item');
                let frog;
                if(el.char== 'o') frog = this.createFrog('red', el.id);
                else frog = this.createFrog('blue', el.id);
                item.setAttribute('data-id', el.id);
                
                this.slotsDiv[i].append(item);
                item.append(frog);
            }
        });
        this.bind();
    }
    bind(){
        this.slotsDiv.forEach(el=>{
            if(el.childNodes[0] !=null){
                el.childNodes[0].childNodes[0].addEventListener('click',(e)=>{
                    const indexEmpty = this.searchChar('');
                    const idChar = e.target.dataset.id;
                    const indexChar = this.searchId(idChar);
                    const absolute = Math.abs(indexEmpty - indexChar);
                    if(absolute <= 2){
                        this.shuffle(indexEmpty, indexChar);
                        this.count();
                        this.checkWin();
                    } else {
                        console.log('Invalid move: ', absolute);
                    }
                    
                });

            }
            
        });
    }
    searchChar(char){
        const index = this.slots.findIndex(x=> x.char == char);
        return index;
    }
    searchId(id){
        const index = this.slots.findIndex(x=> x.id == id);
        return index;
    }
    shuffle(emptyIndex, charIndex){
        const empty = this.slots[emptyIndex];
        this.slots[emptyIndex] = this.slots[charIndex];
        this.slots[charIndex] = empty;
        this.draw();
    }
    count(clear = false){
        if(clear) this.counter = 0;
        else this.counter++;
        this.counterSpan.innerHTML = this.counter;
    }
    reset(){
        this.count(true);
        this.slots = [
            {id: 1, char: 'x'},
            {id: 2, char: 'x'},
            {id: 3, char: 'x'},
            {id: 4, char: ''},
            {id: 5, char: 'o'},
            {id: 6, char: 'o'},
            {id: 7, char: 'o'}];
        this.draw();
    }
    createFrog(color, id){
        const frog = document.createElement('img');
        frog.src = `frog_${color}.svg`;
        frog.classList.add('frog');
        frog.setAttribute('data-id', id);
        return frog;
    }
    checkWin(){
        const winString = 'ooo xxx';
        let currentString ='';
        this.slots.map(slot=>{
            currentString += slot.char;
        });

        if(winString == currentString) alert(`Ukończono w ${this.counter} ruchach`);
    }
}
const game = new Game();