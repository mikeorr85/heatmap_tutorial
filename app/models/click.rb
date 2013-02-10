class Click < ActiveRecord::Base
  attr_accessible :ip_address, :latitude, :longitude

  geocoded_by :ip_address, :if => :ip_address_changed?
  after_validation :geocode

  def self.geocoded_clicks
    geo_data = []

    Click.by_location.each do |click|
      geo_data << { lat:click.latitude, lng:click.longitude, count:click.count * 100 }
    end

    geo_data
  end

  def self.by_location
    all(:select => "latitude, longitude, COUNT(*) as count", :group => "latitude, longitude")
  end
end