module ElementUIStateScopes
  extend ActiveSupport::Concern

  module ClassMethods
    def for_ui_state(ui_state)
      return [] unless ui_state

      all = coerce_all_to_boolean(ui_state.fetch(:all, false))
      collection_id = ui_state.fetch(:collection_id, 'all')

      if (all)
        excluded_ids = ui_state.fetch(:excluded_ids, [])
        collection_id == 'all' ? where.not(id: excluded_ids).uniq : by_collection_id(collection_id.to_i).where.not(id: excluded_ids).uniq
      else
        included_ids = ui_state.fetch(:included_ids, [])
        where(id: included_ids).uniq
      end
    end

    def for_ui_state_with_collection(ui_state, collection_class, collection_id)
      all = coerce_all_to_boolean(ui_state.fetch(:all, false))
      attributes = collection_class.column_names - ["collection_id"]
      element_label = attributes.find { |e| /_id/ =~ e }
      collection_elements = collection_class.where(collection_id: collection_id)
      if (all)
        excluded_ids = ui_state.fetch(:excluded_ids, [])
        result = collection_elements.where.not({element_label => excluded_ids})
        result.pluck(element_label).uniq
      else
        included_ids = ui_state.fetch(:included_ids,[])
        result = collection_elements.where({element_label => included_ids})
        result.pluck(element_label).uniq
      end
    end

    # TODO cleanup coercion in API
    def coerce_all_to_boolean(all)
      return all unless all.is_a? String

      all == "false" ? false : true
    end
  end
end
