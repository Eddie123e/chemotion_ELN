import React, {Component} from 'react';
import { SectionReaction } from './SectionReaction';
import SectionSample from './SectionSample';
import SectionSiProcedures from './SectionSiProcedures';
import SectionSiSynthesis from './SectionSiSynthesis';

const objToKeyValPairs = (obj = []) => {
  return obj.reduce((o, {text, checked} ) => {
    const o_title = text.replace(/\s+/g, '').substring(0, 12);
    o[o_title] = checked
    return o
  }, {})
};

const StdPreviews = ({selectedObjs, splSettings, rxnSettings, configs}) => {
  const splSettings_pairs = objToKeyValPairs(splSettings);
  const rxnSettings_pairs = objToKeyValPairs(rxnSettings);
  const configs_pairs = objToKeyValPairs(configs);

  const objs = selectedObjs.map( (obj, i) => {
    return (
      obj.type === 'sample'
        ? <SectionSample key={i} sample={obj} settings={splSettings_pairs} configs={configs_pairs}/>
        : <SectionReaction key={i} reaction={obj} settings={rxnSettings_pairs} configs={configs_pairs}/>
    )
  })
  return (
    <div> {objs} </div>
  )
}

const SiPreviews = ({selectedObjs, configs}) => {
  const configs_pairs = objToKeyValPairs(configs);

  return (
    <div>
      <p>Experimental Part:</p>
      <br/>
      <p>[1 Versions] Version InCHI (), Version SMILES()</p>
      <br/>
      <p>[2 General remarks]</p>
      <br/>
      <p>[3 General procedures]</p>
      <SectionSiProcedures selectedObjs={selectedObjs} />
      <br/>
      <p>[4 Synthesis]</p>
      <SectionSiSynthesis selectedObjs={selectedObjs} configs={configs_pairs} />
      <br/>
      <p>[5 Spectra and Copies]</p>
      <br/>
    </div>
  );
}

const Previews = ({selectedObjs, splSettings, rxnSettings, configs, template}) => {
  const content = template === 'supporting_information'
                    ? <SiPreviews
                        selectedObjs={selectedObjs}
                        configs={configs}
                      />
                    : <StdPreviews
                        selectedObjs={selectedObjs}
                        splSettings={splSettings}
                        rxnSettings={rxnSettings}
                        configs={configs} />
  return (
    <div className='report-preview'>
      {content}
    </div>
  );
}

export default Previews;