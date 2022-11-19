<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class StimulusLController extends AbstractController
{
    public function stimulus(): Response
    {
        return $this->render('lucky/stimulus.html.twig', []);
    }
}