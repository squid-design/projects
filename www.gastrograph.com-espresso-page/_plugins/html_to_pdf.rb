require 'pdfkit'
module Jekyll

    class HtmlToPDF < Generator

        safe true

        def generate(site)
            @site = site
            #process_pages(site)
        end

        def process_pages(site)
            site.pages.each do |page|
                unless site.config['pdf']['pages'].nil?
                    site.config['pdf']['pages'].each do |pagename|
                        if page.url == pagename
                            PDFKit.configure do |config|
                                config.root_url = "file:///home/evan/dev/jekyll-site"
                                config.verbose = true
                            end
                            kit = PDFKit.new(page.content, :page_size => 'letter')
                            kit.stylesheets << 'assets/css/frontend.css'

                            kit.to_pdf

                            Dir::mkdir(site.dest) if !File.directory? site.dest

                            kit.to_file(File.join(site.dest,"test.pdf"))
                        end
                    end
                end
            end
        end
    end
end
