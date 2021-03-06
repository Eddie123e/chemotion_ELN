class AnalysesExperimentSerializer < ActiveModel::Serializer
  attributes :id, :devices_analysis_id, :on_day, :holder_id, :status, :solvent, :experiment, :priority, :number_of_scans, :sweep_width, :time, :analysis_barcode, :sample_short_label, :sample_id, :devices_sample_id, :sample_analysis_id,
  
  def analysis_barcode
    analysis = DevicesAnalysis.find(object.devices_analysis_id)
    sample = Sample.find(object.sample_id)
    case analysis.analysis_type
      when "NMR" then 
        sample_analysis = sample.analyses.select{|a| a['id'] == object.sample_analysis_id}
        !sample_analysis.empty?  ? sample_analysis.first['bruker_code'] : ""
      else ""
    end
  end

  def sample_short_label
    sample = Sample.find(object.sample_id)
    sample.short_label
  end

end
