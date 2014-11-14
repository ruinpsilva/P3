/**
 * @author jorge
 */
//Extensão da Biblioteca joint.js para incluir um caso de uso
//Na realidade um objecto com uma imagem e o nome actor por baixo
	
joint.shapes.basic.Actor = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><image/></g></g><text/>',

    defaults: joint.util.deepSupplement({

        type: 'basic.Actor',
	angle: 0,
        attrs: {
            text: {
		'text': 'Actor',
		'font-size': 14,
		'ref-x': .5,
		'ref-y': 75,
		'y-alignment': 'middle',
		'text-anchor': 'middle',
		'ref': 'image',
		'fill': 'grey',
        'font-color: grey'
	    },
	    image: {
		'width': 35,
		'height': 70
		}
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
});

// Aqui sim coloca-se o desenho do ator no objeto e devolve-se
 var getGrafActor = function (posX, posY){
 	var ator = new joint.shapes.basic.Actor(
		{
			position: { x: posX, y: posY },
    		//size: { width: 35, height: 70},
    		attrs: { image: { 'xlink:href': "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzNweCIgaGVpZ2h0PSI2M3B4IiB2ZXJzaW9uPSIxLjEiPg0KPGRlZnMvPg0KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41LDAuNSkiPg0KPGVsbGlwc2UgY3g9IjE2IiBjeT0iOSIgcng9IjcuNSIgcnk9IjcuNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIi8+DQo8cGF0aCBkPSJNIDE2IDE2IEwgMTYgNDEgTSAxNiAyMSBMIDEgMjEgTSAxNiAyMSBMIDMxIDIxIE0gMTYgNDEgTCAxIDYxIE0gMTYgNDEgTCAzMSA2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJub25lIi8+PC9nPjwvc3ZnPg=="}}
		}
		
	);
	return ator;
 };
