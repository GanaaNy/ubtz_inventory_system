package mn.ubtaz.inventory.controller;

import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.dto.response.DashboardStatsResponse;
import mn.ubtaz.inventory.entity.Report;
import mn.ubtaz.inventory.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> dashboard() {
        return ResponseEntity.ok(reportService.getDashboardStats());
    }

    @PostMapping("/generate")
    public ResponseEntity<Report> generate(@RequestParam String reportType,
                                           @RequestParam String title,
                                           @RequestBody(required = false) Map<String, Object> parameters) {
        return ResponseEntity.ok(reportService.generateReport(reportType, title, parameters));
    }
}
