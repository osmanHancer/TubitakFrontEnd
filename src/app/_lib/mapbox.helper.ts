// location.forEach((c) => {
//     this.map.addLayer({
//       id: SeyyahnameKod + c.point_type,
//       type: 'heatmap',
//       source: SeyyahnameKod + 'point',
//       paint: {
//         'heatmap-weight': [
//           'interpolate',
//           ['linear'],
//           ['get', 'weight'],
//           0,
//           0,
//           6,
//           1,
//         ],
//         'heatmap-intensity': 1,
//         'heatmap-radius': 33.8,
//         'heatmap-opacity': 0.8,
//         'heatmap-color': [
//           'interpolate',
//           ['linear'],
//           ['heatmap-density'],
//           0,
//           'rgba(0, 0, 255, 0)',
//           0.2,
//           '#4C0035',
//           0.4,
//           '#880030',
//           0.6,
//           '#B72F15',
//           0.8,
//           '#D6610A',
//           1,
//           c.color,
//         ],
//       },
//       filter: ['==', ['get', 'tespit_edilen_konum_olcegi'], c.point_type],
//     });

//   });

// this.map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image:any) => {
//     if (error) throw error;
//     // Add the loaded image to the style's sprite with the ID 'kitten'.
//     this.map.addImage('cat', image);
// });