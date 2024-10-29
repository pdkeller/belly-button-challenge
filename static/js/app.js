// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter((dict) => dict.id === sample);
    console.log(result);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    //panel.html("";)

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    panel.html(`ID: ${result.id} <hr>
      ETHNICITY: ${result.ethnicity} <hr>
      GENDER: ${result.gender} <hr>
      AGE: ${result.age} <hr>
      LOCATION: ${result.location} <hr>
      BBTYPE: ${result.bbtype} <hr>
      WFREQ: ${result.wfreq}`);
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;
    console.log(samples);

    // Filter the samples for the object with the desired sample number
    let result = samples.filter((dict) => dict.id === sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otuIDs = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    // Build a Bubble Chart
    let bubbleTrace = {
      x: [otuIDs],
      y: [sampleValues]
    };

    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    let barTrace = [
      {
        x: [sampleValues],
        y: [otuIDs],
        type: 'bar'
      }
    ];
    
    Plotly.newPlot('myDiv', barTrace);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;
    console.log(names);

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");
    for (let i = 0; i < names.length; i++) {
      dropdownMenu.append("option").attr("value", names[i]).text(names[i])
    };

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list
    let firstSample = dropdownMenu[0];
    console.log(firstSample);

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  //console.log(newSample);
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();



/*d3.select("body")
  .append("svg")
    .attr("width", 960)
    .attr("height", 500)
  .append("g")
    .attr("transform", "translate(20,20)")
  .append("rect")
    .attr("width", 920)
    .attr("height", 460);*/