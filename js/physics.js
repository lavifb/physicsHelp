// paperscript for drawing physics things 
// paperscript for drawing physics things 

ang = Math.PI/6;
start = new Point(200, 300);
upramp = 50;

// inc = inclineA(start, 100, ang);
// boxA(start+[upramp*Math.cos(ang), -upramp*Math.sin(ang)], 25, 25, ang);

parabola = parabola(start, [5, -50], [0, 9.8], 100);
ar = arrow(start, start + [5, -50]);

function incline(leftpoint, width, height) {
	var tri = new Path({
		strokeWidth: 2,
		strokeColor: 'black'
	});
	tri.add(leftpoint);
	tri.add(leftpoint + [width, 0]);
	tri.add(leftpoint + [width, -1*height]);
	tri.closed = true;
	return tri;
};

function inclineA(leftpoint, width, angle) {
	var tri = new Path({
		strokeWidth: 2,
		strokeColor: 'black'
	});
	tri.add(leftpoint);
	tri.add(leftpoint + [width, 0]);
	height = -1*width*Math.tan(angle)
	vector = leftpoint + [width, height]-leftpoint;
	console.log(vector.angle);
	tri.add(leftpoint + [width, height]);
	tri.closed = true;
	return tri;
};

function boxA(leftpoint, width, height, angle) {
	var box = new Path({
		strokeWidth: 2,
		strokeColor: 'black'
	});
	box.add(leftpoint);
	// change in point 1
	dx = width*Math.cos(angle);
	dy = -1*width*Math.sin(angle);
	// change for point 2 from point 1
	dx2 = -1*height*Math.sin(angle);
	dy2 = -1*height*Math.cos(angle);
	// change for point 3 from point 0
	dx3 = -1*height*Math.sin(angle);
	dy3 = -1*height*Math.cos(angle);
	box.add(leftpoint + [dx, dy]);
	vector = leftpoint + [dx, dy]-leftpoint
	console.log(vector.angle);
	box.add(leftpoint + [dx+dx2,dy+dy2]);
	box.add(leftpoint + [dx3,dy3]);
	box.closed = true;
	return box;
};

function parabola(leftpoint, v0, a, points) {
	var para = new Path({
		strokeWidth: 1,
		strokeColor: 'red'
	});
	for (var t=0; t<points;t++) {
		para.add(leftpoint + [v0[0]*t + .5*a[0]*t*t, v0[1]*t + .5*a[1]*t*t]);
	} 
	para.smooth();
	return para;
}

function arrow(start, end) {
	diff = start-end;
	diff.length = 10;
	arr = new Group([
		new Path([start, end]),
		new Path([
			end + diff.rotate(45),
			end,
			end + diff.rotate(-45)
		])
	]);
	arr.strokeWidth = 2;
	arr.strokeColor = 'black';
}

// function onResize(event) {
// // Whenever the window is resized, recenter the path:
//     inc.position = view.center;
// }
